import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import JoseCryptoError from './JoseCryptoError.mjs'

import { AES_CONSTANTS } from './CONSTANTS'
import {
  INVALID_AES_ENCRYPTION_PARAMS,
  INVALID_AES_KEY_STRING_LENGTH,
  INVALID_AES_DECRYPTION_PARAMS,
  INVALID_AES_DECRYPTION_PAYLOAD
} from './ERRORS.mjs'

const {
  ALGORITHM,
  KEY_FORMAT,
  KEY_LENGTH,
  KEY_STRING_LENGTH,
  IV_FORMAT,
  IV_LENGTH,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,
  AUTH_TAG_LENGTH,
  DATA_SEPARATOR
} = AES_CONSTANTS

const Aes = {
  generateKey,
  encrypt,
  decrypt
}

export default Aes

function generateKey () {
  const key = randomBytes(KEY_LENGTH).toString(KEY_FORMAT)
  return key
}

function encrypt (data, key = '') {
  _validateEncryptionParams(key)

  const keyBuffer = Buffer.from(key, KEY_FORMAT)
  const ivBuffer = randomBytes(IV_LENGTH)
  const ivString = ivBuffer.toString(IV_FORMAT)
  const stringifiedData = JSON.stringify({ data })

  try {
    const encryptor = createCipheriv(ALGORITHM, keyBuffer, ivBuffer, { authTagLength: AUTH_TAG_LENGTH })
    const cipherTextBuffer = Buffer.concat([encryptor.update(stringifiedData, PLAIN_TEXT_FORMAT), encryptor.final()])
    const cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT)

    const authTagBuffer = encryptor.getAuthTag()
    const authTagString = authTagBuffer.toString(CIPHER_TEXT_FORMAT)

    const payload = [ivString, authTagString, cipherTextString].join(DATA_SEPARATOR)
    return payload
  } catch (error) {
    const errorCode = `JoseCrypto::AES_${error.code}`
    throw new JoseCryptoError(error, { errorCode })
  }
}

function decrypt (payload, key) {
  _validateDecryptionParams(key, payload)

  const keyBuffer = Buffer.from(key, KEY_FORMAT)
  const [ivString, authTagString, cipherTextString] = payload.split(DATA_SEPARATOR)
  const ivBuffer = Buffer.from(ivString, IV_FORMAT)
  const authTagBuffer = Buffer.from(authTagString, CIPHER_TEXT_FORMAT)
  const cipherTextBuffer = Buffer.from(cipherTextString, CIPHER_TEXT_FORMAT)

  try {
    const decryptor = createDecipheriv(ALGORITHM, keyBuffer, ivBuffer)
    decryptor.setAuthTag(authTagBuffer)

    const plainTextBuffer = Buffer.concat([decryptor.update(cipherTextBuffer), decryptor.final()])
    const plainTextString = plainTextBuffer.toString(PLAIN_TEXT_FORMAT)
    const { data } = JSON.parse(plainTextString)
    return data
  } catch (error) {
    const errorCode = `JoseCrypto::AES_${error.code}`
    throw new JoseCryptoError(error, { errorCode })
  }
}

function _validateEncryptionParams (key) {
  if (!key) {
    throw new JoseCryptoError({}, INVALID_AES_ENCRYPTION_PARAMS)
  }

  if (key.length !== KEY_STRING_LENGTH) {
    throw new JoseCryptoError({}, INVALID_AES_ENCRYPTION_PARAMS)
  }
}

function _validateDecryptionParams (key, payload) {
  if (!key || !payload) {
    throw new JoseCryptoError({}, INVALID_AES_DECRYPTION_PARAMS)
  }

  if (key.length !== KEY_STRING_LENGTH) {
    throw new JoseCryptoError({}, INVALID_AES_KEY_STRING_LENGTH)
  }

  if (payload.split(DATA_SEPARATOR).length !== 3) {
    throw new JoseCryptoError({}, INVALID_AES_DECRYPTION_PAYLOAD)
  }
}
