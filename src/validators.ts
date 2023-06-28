import JoseCryptoError from './JoseCryptoError'
import {
  DECRYPT_DATA_AES_KEY_REQUIRED_ERROR,
  DECRYPT_DATA_INVALID_AES_KEY_ERROR,
  DECRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR,
  DECRYPT_DATA_INVALID_AUTHTAG_LENGTH_ERROR,
  DECRYPT_DATA_INVALID_IV_LENGTH_ERROR,
  DECRYPT_DATA_INVALID_PAYLOAD_ERROR,
  DECRYPT_DATA_PAYLOAD_REQUIRED_ERROR,
  DECRYPT_KEY_AES_KEY_REQUIRED_ERROR,
  DECRYPT_KEY_INVALID_AES_KEY_ERROR,
  DECRYPT_KEY_INVALID_RSA_KEY_ERROR,
  DECRYPT_KEY_RSA_KEY_REQUIRED_ERROR,
  ENCRYPT_DATA_AES_KEY_REQUIRED_ERROR,
  ENCRYPT_DATA_INVALID_AES_KEY_ERROR,
  ENCRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR,
  ENCRYPT_KEY_AES_KEY_REQUIRED_ERROR,
  ENCRYPT_KEY_INVALID_AES_KEY_ERROR,
  ENCRYPT_KEY_INVALID_AES_KEY_LENGTH_ERROR,
  ENCRYPT_KEY_INVALID_RSA_KEY_ERROR,
  ENCRYPT_KEY_RSA_KEY_REQUIRED_ERROR
} from './ERRORS'

/** @ignore */
export function validateEncryptKey(
  aesKey: string,
  rsaPublicKey: string
): Buffer {
  if (!aesKey) {
    throw new JoseCryptoError(undefined, ENCRYPT_KEY_AES_KEY_REQUIRED_ERROR)
  }

  if (!rsaPublicKey) {
    throw new JoseCryptoError(undefined, ENCRYPT_KEY_RSA_KEY_REQUIRED_ERROR)
  }

  if (typeof aesKey !== 'string') {
    throw new JoseCryptoError(undefined, ENCRYPT_KEY_INVALID_AES_KEY_ERROR)
  }

  if (typeof rsaPublicKey !== 'string') {
    throw new JoseCryptoError(undefined, ENCRYPT_KEY_INVALID_RSA_KEY_ERROR)
  }

  const buffer = Buffer.from(aesKey, 'base64')

  if (buffer.length !== 32) {
    throw new JoseCryptoError(
      undefined,
      ENCRYPT_KEY_INVALID_AES_KEY_LENGTH_ERROR
    )
  }

  return buffer
}

/** @ignore */
export function validateDecryptKey(
  encryptedAesKey: string,
  rsaPrivateKey: string
): Buffer {
  if (!encryptedAesKey) {
    throw new JoseCryptoError(undefined, DECRYPT_KEY_AES_KEY_REQUIRED_ERROR)
  }

  if (!rsaPrivateKey) {
    throw new JoseCryptoError(undefined, DECRYPT_KEY_RSA_KEY_REQUIRED_ERROR)
  }

  if (typeof encryptedAesKey !== 'string') {
    throw new JoseCryptoError(undefined, DECRYPT_KEY_INVALID_AES_KEY_ERROR)
  }

  if (typeof rsaPrivateKey !== 'string') {
    throw new JoseCryptoError(undefined, DECRYPT_KEY_INVALID_RSA_KEY_ERROR)
  }

  const buffer = Buffer.from(encryptedAesKey, 'base64')
  return buffer
}

/** @ignore */
export function validateEncryptData(data: any, aesKey: string): Buffer {
  if (!aesKey) {
    throw new JoseCryptoError(undefined, ENCRYPT_DATA_AES_KEY_REQUIRED_ERROR)
  }

  if (typeof aesKey !== 'string') {
    throw new JoseCryptoError(undefined, ENCRYPT_DATA_INVALID_AES_KEY_ERROR)
  }

  const buffer = Buffer.from(aesKey, 'base64')

  if (buffer.length !== 32) {
    throw new JoseCryptoError(
      undefined,
      ENCRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR
    )
  }

  return buffer
}

/** @ignore */
export function validateDecryptDataPayload(payload: string): Array<Buffer> {
  if (!payload) {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_PAYLOAD_REQUIRED_ERROR)
  }

  if (typeof payload !== 'string') {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_INVALID_PAYLOAD_ERROR)
  }

  const [ivString, authTagString, cipherTextString] = payload.split('.')

  if (!ivString || !authTagString || !cipherTextString) {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_INVALID_PAYLOAD_ERROR)
  }

  const ivBuffer = Buffer.from(ivString, 'base64')
  const authTagBuffer = Buffer.from(authTagString, 'base64')
  const cipherTextBuffer = Buffer.from(cipherTextString, 'base64')

  if (ivBuffer.length !== 16) {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_INVALID_IV_LENGTH_ERROR)
  }

  if (authTagBuffer.length !== 16) {
    throw new JoseCryptoError(
      undefined,
      DECRYPT_DATA_INVALID_AUTHTAG_LENGTH_ERROR
    )
  }

  return [ivBuffer, authTagBuffer, cipherTextBuffer]
}

/** @ignore */
export function validateDecryptDataKey(aesKey: string): Buffer {
  if (!aesKey) {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_AES_KEY_REQUIRED_ERROR)
  }

  if (typeof aesKey !== 'string') {
    throw new JoseCryptoError(undefined, DECRYPT_DATA_INVALID_AES_KEY_ERROR)
  }

  const buffer = Buffer.from(aesKey, 'base64')

  if (buffer.length !== 32) {
    throw new JoseCryptoError(
      undefined,
      DECRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR
    )
  }

  return buffer
}
