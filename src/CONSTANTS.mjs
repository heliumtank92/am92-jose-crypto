import crypto from 'crypto'

export const RSA_CONSTANTS = {
  ALGOGRITHM: 'rsa',
  OPTIONS: {
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },

  PLAIN_TEXT_FORMAT: 'base64',
  CIPHER_TEXT_FORMAT: 'base64',

  KEY_OPTIONS: {
    modulusLength: 2048
  },

  ERRORS: {
    INVALID_ENCRYPTION_DATA: {
      message: 'Provided \'data\' must be a non-empty string',
      code: 'INVALID_ENCRYPTION_PARAMS'
    },
    INVALID_ENCRYPTION_KEY: {
      message: 'Provided \'publicKey\' must be a non-empty string',
      code: 'INVALID_ENCRYPTION_PARAMS'
    },
    INVALID_DECRYPTION_DATA: {
      message: 'Provided \'payload\' or \'cipherText\' must be a non-empty string',
      code: 'INVALID_DECRYPTION_PARAMS'
    },
    INVALID_DECRYPTION_KEY: {
      message: 'Provided \'privateKey\' must be a non-empty string',
      code: 'INVALID_DECRYPTION_PARAMS'
    }
  }
}

const AES_256_GCM_KEY_LENGTH = 32
const AES_256_KEY_STRING_LENGTH = 4 * Math.ceil(AES_256_GCM_KEY_LENGTH / 3)

export const AES_256_GCM_CONSTANTS = {
  AES_ALGORITHM: 'aes-256-gcm',
  KEY_FORMAT: 'base64',
  KEY_LENGTH: AES_256_GCM_KEY_LENGTH,
  KEY_STRING_LENGTH: AES_256_KEY_STRING_LENGTH,
  IV_FORMAT: 'base64',
  IV_LENGTH: 16,
  PLAIN_TEXT_FORMAT: 'utf8',
  CIPHER_TEXT_FORMAT: 'base64',
  AUTH_TAG_LENGTH: 16,
  DATA_SEPARATOR: '.',

  ERRORS: {
    INVALID_ENCRYPTION_PARAMS: {
      message: '\'key\' must be provided',
      code: 'INVALID_ENCRYPTION_PARAMS'
    },
    INVALID_KEY_STRING_LENGTH: {
      message: `'key' must be of length ${AES_256_KEY_STRING_LENGTH}`,
      code: 'INVALID_KEY_STRING_LENGTH'
    },
    INVALID_DECRYPTION_PARAMS: {
      message: 'Provided \'payload\' and \'key\' must have values',
      code: 'INVALID_DECRYPTION_PARAMS'
    },
    INVALID_DECRYPTION_PAYLOAD: {
      message: 'Provided \'payload\' is of incorrect format',
      code: 'INVALID_DECRYPTION_PAYLOAD'
    }
  }
}
