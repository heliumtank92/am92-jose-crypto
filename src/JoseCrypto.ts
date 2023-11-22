import crypto, { RsaPrivateKey } from 'crypto'
import { JoseCryptoError } from './JoseCryptoError'
import {
  validateDecryptDataKey,
  validateDecryptDataPayload,
  validateDecryptKey,
  validateEncryptData,
  validateEncryptKey
} from './validators'
import { derToPem, jsonParse } from './utils'

/**
 * JoseCrypto Class to implement JOSE Cryptography.
 *
 * @class
 * @typedef {JoseCrypto}
 */
export class JoseCrypto {
  /**
   * Function to encrypt AES-256-GCM key using `RSA-OAEP` public key.
   *
   * <b>Throws :</b> {@link JoseCryptoError}. Expected error codes :
   * - JoseCrypto::ENCRYPT_KEY_AES_KEY_REQUIRED
   * - JoseCrypto::ENCRYPT_KEY_RSA_KEY_REQUIRED
   * - JoseCrypto::ENCRYPT_KEY_INVALID_AES_KEY
   * - JoseCrypto::ENCRYPT_KEY_INVALID_RSA_KEY
   * - JoseCrypto::ENCRYPT_KEY_INVALID_AES_KEY_LENGTH
   * - JoseCrypto::ENCRYPT_KEY_INVALID_AES_KEY_LENGTH
   * - JoseCrypto::ENCRYPT_KEY_UNKNOWN_ERR_CODE
   * - JoseCrypto::ENCRYPT_KEY_{CRYPTO_ERROR_CODE}
   *
   * @static
   * @param aesKey AES-256-GCM key as a Base64 string.
   * @param rsaPublicKey RSA-OAEP public key in DER format as a Base64 string.
   * @returns Encrypted AES-256-GCM key as a Base64 string.
   */
  static encryptKey(aesKey: string, rsaPublicKey: string): string {
    const keyBuffer = validateEncryptKey(aesKey, rsaPublicKey)
    const rsaPemKey = derToPem(rsaPublicKey, 'PUBLIC KEY')
    try {
      const wrapParams: RsaPrivateKey = {
        key: rsaPemKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      }

      const encryptedKeyBuffer = crypto.publicEncrypt(wrapParams, keyBuffer)
      const encryptedAesKey = encryptedKeyBuffer.toString('base64')
      return encryptedAesKey
    } catch (error: any) {
      const errorCode = `JoseCrypto::DECRYPT_KEY_${
        error.code || 'UNKNOWN_ERR_CODE'
      }`
      throw new JoseCryptoError(error, { errorCode })
    }
  }

  /**
   * Function to decrypt AES-256-GCM encrypted key using `RSA-OAEP` private key.
   *
   * <b>Throws :</b> {@link JoseCryptoError}. Expected error codes :
   * - JoseCrypto::DECRYPT_KEY_AES_KEY_REQUIRED
   * - JoseCrypto::DECRYPT_KEY_RSA_KEY_REQUIRED
   * - JoseCrypto::DECRYPT_KEY_INVALID_AES_KEY
   * - JoseCrypto::DECRYPT_KEY_INVALID_RSA_KEY
   * - JoseCrypto::DECRYPT_KEY_UNKNOWN_ERR_CODE
   * - JoseCrypto::DECRYPT_KEY_{CRYPTO_ERROR_CODE}
   *
   * @static
   * @param encryptedAesKey AES-256-GCM key encrypted with RSA-OAEP public key
   * @param rsaPrivateKey RSA-OAEP private key in DER format as a Base64 string.
   * @returns Decrypted AES-256-GCM key as a Base64 string.
   */
  static decryptKey(encryptedAesKey: string, rsaPrivateKey: string) {
    const encryptedKeyBuffer = validateDecryptKey(
      encryptedAesKey,
      rsaPrivateKey
    )
    const rsaPemKey = derToPem(rsaPrivateKey, 'PRIVATE KEY')
    try {
      const unwrapParams: RsaPrivateKey = {
        key: rsaPemKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      }
      const keyBuffer = crypto.privateDecrypt(unwrapParams, encryptedKeyBuffer)
      const aesKey = keyBuffer.toString('base64')
      return aesKey
    } catch (error: any) {
      const errorCode = `JoseCrypto::DECRYPT_KEY_${
        error.code || 'UNKNOWN_ERR_CODE'
      }`
      throw new JoseCryptoError(error, { errorCode })
    }
  }

  /**
   * Function to encrypt any data using `AES-256-GCM` algorithm.
   *
   * <b>Throws :</b> {@link JoseCryptoError}. Expected error codes :
   * - JoseCrypto::ENCRYPT_DATA_AES_KEY_REQUIRED
   * - JoseCrypto::ENCRYPT_DATA_INVALID_AES_KEY
   * - JoseCrypto::ENCRYPT_DATA_INVALID_AES_KEY_LENGTH
   * - JoseCrypto::ENCRYPT_DATA_UNKNOWN_ERR_CODE
   * - JoseCrypto::ENCRYPT_DATA_{CRYPTO_ERROR_CODE}
   *
   * @static
   * @param data Data to be encrypted.
   * @param aesKey AES-256-GCM key as a Base64 string.
   * @returns Encrypted data as Base64 string in the format {IV.AUTH_TAG.CIPHERTEXT}.
   */
  static encryptData(data: any, aesKey: string): string {
    const keyBuffer = validateEncryptData(data, aesKey)
    const ivBuffer = crypto.randomBytes(16)
    const ivString = ivBuffer.toString('base64')
    const dataString = typeof data === 'string' ? data : JSON.stringify(data)

    try {
      const encryptor = crypto.createCipheriv(
        'aes-256-gcm',
        keyBuffer,
        ivBuffer,
        { authTagLength: 16 }
      )
      const cipherTextBuffer = Buffer.concat([
        encryptor.update(dataString, 'utf8'),
        encryptor.final()
      ])
      const cipherTextString = cipherTextBuffer.toString('base64')

      const authTagBuffer = encryptor.getAuthTag()
      const authTagString = authTagBuffer.toString('base64')

      const payload = [ivString, authTagString, cipherTextString].join('.')
      return payload
    } catch (error: any) {
      const errorCode = `JoseCrypto::ENCRYPT_DATA_${
        error.code || 'UNKNOWN_ERR_CODE'
      }`
      throw new JoseCryptoError(error, { errorCode })
    }
  }

  /**
   * Function to decrypt encrypted payload using `AES-256-GCM` algorithm.
   *
   * <b>Throws :</b> {@link JoseCryptoError}. Expected error codes :
   * - JoseCrypto::DECRYPT_DATA_PAYLOAD_REQUIRED
   * - JoseCrypto::DECRYPT_DATA_INVALID_PAYLOAD
   * - JoseCrypto::DECRYPT_DATA_INVALID_IV_LENGTH
   * - JoseCrypto::DECRYPT_DATA_INVALID_AUTHTAG_LENGTH
   * - JoseCrypto::DECRYPT_DATA_AES_KEY_REQUIRED
   * - JoseCrypto::DECRYPT_DATA_INVALID_AES_KEY
   * - JoseCrypto::DECRYPT_DATA_INVALID_AES_KEY_LENGTH
   * - JoseCrypto::DECRYPT_DATA_UNKNOWN_ERR_CODE
   * - JoseCrypto::DECRYPT_DATA_{CRYPTO_ERROR_CODE}
   *
   * @static
   * @param payload AES-256-GCM encrypted Base64 string in the format {IV.AUTH_TAG.CIPHERTEXT}.
   * @param aesKey AES-256-GCM key as a Base64 string.
   * @returns
   */
  static decryptData(payload: string, aesKey: string): any {
    const payloadPartsBuffers = validateDecryptDataPayload(payload)
    const keyBuffer = validateDecryptDataKey(aesKey)

    const [ivBuffer, authTagBuffer, cipherTextBuffer] = payloadPartsBuffers

    try {
      const decryptor = crypto.createDecipheriv(
        'aes-256-gcm',
        keyBuffer,
        ivBuffer
      )
      decryptor.setAuthTag(authTagBuffer)

      const plainTextBuffer = Buffer.concat([
        decryptor.update(cipherTextBuffer),
        decryptor.final()
      ])
      const plainTextString = plainTextBuffer.toString('utf8')
      const data = jsonParse(plainTextString)
      return data
    } catch (error: any) {
      const errorCode = `JoseCrypto::DECRYPT_DATA_${
        error.code || 'UNKNOWN_ERR_CODE'
      }`
      throw new JoseCryptoError(error, { errorCode })
    }
  }
}
