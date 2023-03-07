
import { publicEncrypt, privateDecrypt, generateKeyPairSync } from 'crypto'
import JoseCryptoError from '../JoseCryptoError.mjs'

import { RSA_CONSTANTS } from '../CONSTANTS.mjs'
import {
  INVALID_RSA_ENCRYPTION_DATA_ERROR,
  INVALID_RSA_ENCRYPTION_KEY_ERROR,
  INVALID_RSA_DECRYPTION_DATA_ERROR,
  INVALID_RSA_DECRYPTION_KEY_ERROR
} from '../ERRORS.mjs'

const {
  ALGOGRITHM,
  OPTIONS,
  KEY_OPTIONS,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT
} = RSA_CONSTANTS

const Rsa = {
  generateKey,
  encrypt,
  decrypt
}

export default Rsa

async function generateKey () {
  try {
    const keyPair = generateKeyPairSync(ALGOGRITHM, KEY_OPTIONS)
    return keyPair
  } catch (error) {
    const errorCode = `JoseCrypto::RSA_${error.code}`
    throw new JoseCryptoError(error, { errorCode })
  }
}

function encrypt (data = '', publicKey = '') {
  _validateExistString(data, INVALID_RSA_ENCRYPTION_DATA_ERROR)
  _validateExistString(publicKey, INVALID_RSA_ENCRYPTION_KEY_ERROR)

  try {
    const pemString = derToPemString(publicKey, 'PUBLIC KEY')
    const encryptParams = { key: pemString, ...OPTIONS }
    const dataBuffer = Buffer.from(data, PLAIN_TEXT_FORMAT)
    const cipherTextBuffer = publicEncrypt(encryptParams, dataBuffer)
    const cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT)

    return cipherTextString
  } catch (error) {
    const errorCode = `JoseCrypto::RSA_${error.code}`
    throw new JoseCryptoError(error, { errorCode })
  }
}

function decrypt (payload = '', privateKey = '') {
  _validateExistString(payload, INVALID_RSA_DECRYPTION_DATA_ERROR)
  _validateExistString(privateKey, INVALID_RSA_DECRYPTION_KEY_ERROR)

  try {
    const pemString = derToPemString(privateKey, 'PRIVATE KEY')
    const decryptParams = { key: pemString, ...OPTIONS }
    const payloadBuffer = Buffer.from(payload, CIPHER_TEXT_FORMAT)
    const plainTextBuffer = privateDecrypt(decryptParams, payloadBuffer)
    const data = plainTextBuffer.toString(PLAIN_TEXT_FORMAT)
    return data
  } catch (error) {
    const errorCode = `JoseCrypto::RSA_${error.code}`
    throw new JoseCryptoError(error, { errorCode })
  }
}

function _validateExistString (string, errorMap) {
  if (typeof string !== 'string' || !string) {
    throw new JoseCryptoError({}, errorMap)
  }
}

function derToPemString (key, keyType) {
  const prefix = `-----BEGIN ${keyType}-----\n`
  const postfix = `-----END ${keyType}-----`
  const pemString = prefix + key.match(/.{0,64}/g).join('\n') + postfix
  return pemString
}
