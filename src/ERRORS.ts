import { JoseCryptoErrorMap } from './TYPES'

/** =============== Encrypt Key Errors =============== */
/** @ignore */
export const ENCRYPT_KEY_AES_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'aesKey is required',
  errorCode: 'JoseCrypto::ENCRYPT_KEY_AES_KEY_REQUIRED'
}

/** @ignore */
export const ENCRYPT_KEY_RSA_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'rsaPublicKey is required',
  errorCode: 'JoseCrypto::ENCRYPT_KEY_RSA_KEY_REQUIRED'
}

/** @ignore */
export const ENCRYPT_KEY_INVALID_AES_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey type. Must be a string',
  errorCode: 'JoseCrypto::ENCRYPT_KEY_INVALID_AES_KEY'
}

/** @ignore */
export const ENCRYPT_KEY_INVALID_RSA_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid rsaPublicKey type. Must be a string',
  errorCode: 'JoseCrypto::ENCRYPT_KEY_INVALID_RSA_KEY'
}

/** @ignore */
export const ENCRYPT_KEY_INVALID_AES_KEY_LENGTH_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey length',
  errorCode: 'JoseCrypto::ENCRYPT_KEY_INVALID_AES_KEY_LENGTH'
}
/** ================================================== */

/** =============== Decrypt Key Errors =============== */
/** @ignore */
export const DECRYPT_KEY_AES_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'encryptedAesKey is required',
  errorCode: 'JoseCrypto::DECRYPT_KEY_AES_KEY_REQUIRED'
}

/** @ignore */
export const DECRYPT_KEY_RSA_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'rsaPrivateKey is required',
  errorCode: 'JoseCrypto::DECRYPT_KEY_RSA_KEY_REQUIRED'
}

/** @ignore */
export const DECRYPT_KEY_INVALID_AES_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid encryptedAesKey type. Must be a string',
  errorCode: 'JoseCrypto::DECRYPT_KEY_INVALID_AES_KEY'
}

/** @ignore */
export const DECRYPT_KEY_INVALID_RSA_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid rsaPrivateKey type. Must be a string',
  errorCode: 'JoseCrypto::DECRYPT_KEY_INVALID_RSA_KEY'
}
/** ================================================== */

/** =============== Encrypt Data Errors =============== */
/** @ignore */
export const ENCRYPT_DATA_AES_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'aesKey is required',
  errorCode: 'JoseCrypto::ENCRYPT_DATA_AES_KEY_REQUIRED'
}

/** @ignore */
export const ENCRYPT_DATA_INVALID_AES_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey type. Must be a string',
  errorCode: 'JoseCrypto::ENCRYPT_DATA_INVALID_AES_KEY'
}

/** @ignore */
export const ENCRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey length',
  errorCode: 'JoseCrypto::ENCRYPT_DATA_INVALID_AES_KEY_LENGTH'
}
/** =================================================== */

/** =============== Decrypt Data Errors =============== */
/** @ignore */
export const DECRYPT_DATA_PAYLOAD_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'payload is required',
  errorCode: 'JoseCrypto::DECRYPT_DATA_PAYLOAD_REQUIRED'
}

/** @ignore */
export const DECRYPT_DATA_INVALID_PAYLOAD_ERROR: JoseCryptoErrorMap = {
  message:
    'Invalid payload. Must be a string of format {IV.AUTH_TAG.CIPHERTEXT}',
  errorCode: 'JoseCrypto::DECRYPT_DATA_INVALID_PAYLOAD'
}

/** @ignore */
export const DECRYPT_DATA_INVALID_IV_LENGTH_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid IV length in payload',
  errorCode: 'JoseCrypto::DECRYPT_DATA_INVALID_IV_LENGTH'
}

/** @ignore */
export const DECRYPT_DATA_INVALID_AUTHTAG_LENGTH_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid authTag length in payload',
  errorCode: 'JoseCrypto::DECRYPT_DATA_INVALID_AUTHTAG_LENGTH'
}

/** @ignore */
export const DECRYPT_DATA_AES_KEY_REQUIRED_ERROR: JoseCryptoErrorMap = {
  message: 'aesKey is required',
  errorCode: 'JoseCrypto::DECRYPT_DATA_AES_KEY_REQUIRED'
}

/** @ignore */
export const DECRYPT_DATA_INVALID_AES_KEY_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey type. Must be a string',
  errorCode: 'JoseCrypto::DECRYPT_DATA_INVALID_AES_KEY'
}

/** @ignore */
export const DECRYPT_DATA_INVALID_AES_KEY_LENGTH_ERROR: JoseCryptoErrorMap = {
  message: 'Invalid aesKey length',
  errorCode: 'JoseCrypto::DECRYPT_DATA_INVALID_AES_KEY_LENGTH'
}
/** =================================================== */
