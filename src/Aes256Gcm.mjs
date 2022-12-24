import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import { AES_256_GCM_CONSTANTS } from './CONSTANTS'

const {
  AES_ALGORITHM,
  KEY_FORMAT,
  KEY_LENGTH,
  KEY_STRING_LENGTH,
  IV_FORMAT,
  IV_LENGTH,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,
  AUTH_TAG_LENGTH,
  DATA_SEPARATOR,
  ERRORS: {
    INVALID_ENCRYPTION_PARAMS,
    INVALID_KEY_STRING_LENGTH,
    INVALID_DECRYPTION_PARAMS,
    INVALID_DECRYPTION_PAYLOAD
  }
} = AES_256_GCM_CONSTANTS

const Aes256Gcm = {
  generateKey,
  encrypt,
  decrypt
}

export default Aes256Gcm

function generateKey () {
  const key = randomBytes(KEY_LENGTH).toString(KEY_FORMAT)
  return key
}

function encrypt (data, key = '') {
  const source = `${AES_ALGORITHM}:encrypt`
  _validateEncryptionParams(source, key)

  const keyBuffer = Buffer.from(key, KEY_FORMAT)
  const ivBuffer = randomBytes(IV_LENGTH)
  const ivString = ivBuffer.toString(IV_FORMAT)
  const stringifiedData = JSON.stringify({ data })

  try {
    const encryptor = createCipheriv(AES_ALGORITHM, keyBuffer, ivBuffer, { authTagLength: AUTH_TAG_LENGTH })
    const cipherTextBuffer = Buffer.concat([encryptor.update(stringifiedData, PLAIN_TEXT_FORMAT), encryptor.final()])
    const cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT)

    const authTagBuffer = encryptor.getAuthTag()
    const authTagString = authTagBuffer.toString(CIPHER_TEXT_FORMAT)

    const payload = [ivString, authTagString, cipherTextString].join(DATA_SEPARATOR)
    return payload
  } catch (error) {
    const { msg, message, code } = error
    throw { source, message: msg || message, code } // eslint-disable-line no-throw-literal
  }
}

function decrypt (payload, key) {
  const source = `${AES_ALGORITHM}:decrypt`
  _validateDecryptionParams(source, key, payload)

  const keyBuffer = Buffer.from(key, KEY_FORMAT)
  const [ivString, authTagString, cipherTextString] = payload.split(DATA_SEPARATOR)
  const ivBuffer = Buffer.from(ivString, IV_FORMAT)
  const authTagBuffer = Buffer.from(authTagString, CIPHER_TEXT_FORMAT)
  const cipherTextBuffer = Buffer.from(cipherTextString, CIPHER_TEXT_FORMAT)

  try {
    const decryptor = createDecipheriv(AES_ALGORITHM, keyBuffer, ivBuffer)
    decryptor.setAuthTag(authTagBuffer)

    const plainTextBuffer = Buffer.concat([decryptor.update(cipherTextBuffer), decryptor.final()])
    const plainTextString = plainTextBuffer.toString(PLAIN_TEXT_FORMAT)
    const { data } = JSON.parse(plainTextString)
    return data
  } catch (error) {
    const { msg, message, code } = error
    throw { source, message: msg || message, code } // eslint-disable-line no-throw-literal
  }
}

function _validateEncryptionParams (source = '', key) {
  if (!key) {
    const { message, code } = INVALID_ENCRYPTION_PARAMS
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }

  if (key.length !== KEY_STRING_LENGTH) {
    const { message, code } = INVALID_KEY_STRING_LENGTH
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }
}

function _validateDecryptionParams (source = '', key, payload) {
  if (!key || !payload) {
    const { message, code } = INVALID_DECRYPTION_PARAMS
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }

  if (key.length !== KEY_STRING_LENGTH) {
    const { message, code } = INVALID_KEY_STRING_LENGTH
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }

  if (payload.split(DATA_SEPARATOR).length !== 3) {
    const { message, code } = INVALID_DECRYPTION_PAYLOAD
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }
}
