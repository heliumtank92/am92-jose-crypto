import RSA from './Rsa.mjs'
import Aes from './Aes.mjs'

const { decrypt: decryptKey, encrypt: encryptKey } = RSA
const { decrypt: decryptData, encrypt: encryptData } = Aes

const JoseCrypto = {
  decryptKey,
  encryptKey,
  encryptData,
  decryptData
}

export default JoseCrypto