import { AES_CONSTANTS } from './CONSTANTS.mjs'

const { KEY_STRING_LENGTH } = AES_CONSTANTS

const INVALID_RSA_ENCRYPTION_DATA = {
  message: 'Provided \'data\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_ENCRYPTION_DATA'
}

const INVALID_RSA_ENCRYPTION_KEY = {
  message: 'Provided \'publicKey\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_ENCRYPTION_KEY'
}

const INVALID_RSA_DECRYPTION_DATA = {
  message: 'Provided \'payload\' or \'cipherText\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_DECRYPTION_DATA'
}

const INVALID_RSA_DECRYPTION_KEY = {
  message: 'Provided \'privateKey\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_DECRYPTION_KEY'
}

const INVALID_AES_ENCRYPTION_PARAMS = {
  message: '\'key\' must be provided',
  errorCode: 'JosseCrypto::INVALID_AES_ENCRYPTION_PARAMS'
}

const INVALID_AES_KEY_STRING_LENGTH = {
  message: `'key' must be of length ${KEY_STRING_LENGTH}`,
  errorCode: 'JosseCrypto::INVALID_AES_KEY_STRING_LENGTH'
}

const INVALID_AES_DECRYPTION_PARAMS = {
  message: 'Provided \'payload\' and \'key\' must have values',
  errorCode: 'JosseCrypto::INVALID_AES_DECRYPTION_PARAMS'
}

const INVALID_AES_DECRYPTION_PAYLOAD = {
  message: 'Provided \'payload\' is of incorrect format',
  errorCode: 'JosseCrypto::INVALID_AES_DECRYPTION_PAYLOAD'
}

export {
  INVALID_RSA_ENCRYPTION_DATA,
  INVALID_RSA_ENCRYPTION_KEY,
  INVALID_RSA_DECRYPTION_DATA,
  INVALID_RSA_DECRYPTION_KEY,

  INVALID_AES_ENCRYPTION_PARAMS,
  INVALID_AES_KEY_STRING_LENGTH,
  INVALID_AES_DECRYPTION_PARAMS,
  INVALID_AES_DECRYPTION_PAYLOAD
}
