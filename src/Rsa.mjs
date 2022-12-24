
import { publicEncrypt, privateDecrypt, generateKeyPairSync } from 'crypto'
import { RSA_CONSTANTS } from './CONSTANTS'

const {
  ALGOGRITHM,
  OPTIONS,
  KEY_OPTIONS,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,
  ERRORS: {
    INVALID_ENCRYPTION_DATA,
    INVALID_ENCRYPTION_KEY,
    INVALID_DECRYPTION_DATA,
    INVALID_DECRYPTION_KEY
  }
} = RSA_CONSTANTS

const Rsa = {
  generateKey,
  encrypt,
  decrypt
}

export default Rsa

async function generateKey () {
  const source = `${ALGOGRITHM}:generateKey`
  try {
    const keyPair = generateKeyPairSync(ALGOGRITHM, KEY_OPTIONS)
    return keyPair
  } catch (error) {
    const { msg, message, code } = error
    throw { source, message: msg || message, code } // eslint-disable-line no-throw-literal
  }
}

function encrypt (data = '', publicKey = '') {
  const source = `${ALGOGRITHM}:encrypt`
  _validateExistString(source, data, INVALID_ENCRYPTION_DATA)
  _validateExistString(source, publicKey, INVALID_ENCRYPTION_KEY)

  try {
    const pemString = derToPemString(publicKey, 'PUBLIC KEY')
    const encryptParams = { key: pemString, ...OPTIONS }
    const dataBuffer = Buffer.from(data, PLAIN_TEXT_FORMAT)
    const cipherTextBuffer = publicEncrypt(encryptParams, dataBuffer)
    const cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT)

    return cipherTextString
  } catch (error) {
    const { msg, message, code } = error
    throw { source, message: msg || message, code } // eslint-disable-line no-throw-literal
  }
}

function decrypt (payload = '', privateKey = '') {
  const source = `${ALGOGRITHM}:decrypt`
  _validateExistString(source, payload, INVALID_DECRYPTION_DATA)
  _validateExistString(source, privateKey, INVALID_DECRYPTION_KEY)

  try {
    const pemString = derToPemString(privateKey, 'PRIVATE KEY')
    const decryptParams = { key: pemString, ...OPTIONS }
    const payloadBuffer = Buffer.from(payload, CIPHER_TEXT_FORMAT)
    const plainTextBuffer = privateDecrypt(decryptParams, payloadBuffer)
    const data = plainTextBuffer.toString(PLAIN_TEXT_FORMAT)
    return data
  } catch (error) {
    const { msg, message, code } = error
    throw { source, message: msg || message, code } // eslint-disable-line no-throw-literal
  }
}

function _validateExistString (source, string, errorMap) {
  if (typeof string !== 'string' || !string) {
    const { message, code } = errorMap
    throw { source, message, code } // eslint-disable-line no-throw-literal
  }
}

function derToPemString (key, keyType) {
  const prefix = `-----BEGIN ${keyType}-----\n`
  const postfix = `-----END ${keyType}-----`
  const pemString = prefix + key.match(/.{0,64}/g).join('\n') + postfix
  return pemString
}
