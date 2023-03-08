import RSA from './lib/Rsa.mjs'
import Aes from './lib/Aes.mjs'

const JoseCrypto = {
  decryptKey: RSA.decrypt,
  encryptKey: RSA.encrypt,
  encryptData: Aes.encrypt,
  decryptData: Aes.decrypt
}

export default JoseCrypto
