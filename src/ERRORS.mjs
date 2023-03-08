import { AES_CONSTANTS } from './CONSTANTS.mjs'

const { KEY_STRING_LENGTH } = AES_CONSTANTS

const INVALID_RSA_ENCRYPTION_DATA_ERROR = {
  message: 'Provided \'data\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_ENCRYPTION_DATA'
}

const INVALID_RSA_ENCRYPTION_KEY_ERROR = {
  message: 'Provided \'publicKey\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_ENCRYPTION_KEY'
}

const INVALID_RSA_DECRYPTION_DATA_ERROR = {
  message: 'Provided \'payload\' or \'cipherText\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_DECRYPTION_DATA'
}

const INVALID_RSA_DECRYPTION_KEY_ERROR = {
  message: 'Provided \'privateKey\' must be a non-empty string',
  errorCode: 'JoseCrypto::INVALID_RSA_DECRYPTION_KEY'
}

const INVALID_AES_ENCRYPTION_PARAMS_ERROR = {
  message: '\'key\' must be provided',
  errorCode: 'JosseCrypto::INVALID_AES_ENCRYPTION_PARAMS'
}

const INVALID_AES_KEY_STRING_LENGTH_ERROR = {
  message: `'key' must be of length ${KEY_STRING_LENGTH}`,
  errorCode: 'JosseCrypto::INVALID_AES_KEY_STRING_LENGTH'
}

const INVALID_AES_DECRYPTION_PARAMS_ERROR = {
  message: 'Provided \'payload\' and \'key\' must have values',
  errorCode: 'JosseCrypto::INVALID_AES_DECRYPTION_PARAMS'
}

const INVALID_AES_DECRYPTION_PAYLOAD_ERROR = {
  message: 'Provided \'payload\' is of incorrect format',
  errorCode: 'JosseCrypto::INVALID_AES_DECRYPTION_PAYLOAD'
}

export {
  INVALID_RSA_ENCRYPTION_DATA_ERROR,
  INVALID_RSA_ENCRYPTION_KEY_ERROR,
  INVALID_RSA_DECRYPTION_DATA_ERROR,
  INVALID_RSA_DECRYPTION_KEY_ERROR,

  INVALID_AES_ENCRYPTION_PARAMS_ERROR,
  INVALID_AES_KEY_STRING_LENGTH_ERROR,
  INVALID_AES_DECRYPTION_PARAMS_ERROR,
  INVALID_AES_DECRYPTION_PAYLOAD_ERROR
}
