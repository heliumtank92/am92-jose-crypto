import RSA from './RSA'
import Aes256GCM from './Aes256GCM'

const { decrypt: decryptKey, encrypt: encryptKey } = RSA
const { decrypt: decryptData, encrypt: encryptData } = Aes256GCM

const Crypto = {
  decryptKey,
  encryptKey,
  encryptData,
  decryptData
}

export default Crypto
