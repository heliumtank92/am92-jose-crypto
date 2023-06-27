import { JoseCryptoKeyObj } from './TYPES'

/**
 * JoseCrypto Class to implement JOSE Cryptography.
 *
 * @class
 * @typedef {JoseCrypto}
 */
export default class JoseCrypto {
  /**
   * Function to generate AES-256-GCM Key in plaintext and encrypted string. Encrypted key is generated using RSA-OAEP public key.
   *
   * @static
   * @async
   * @param base64PublicKey RSA-OAEP public key as Base64 string.
   * @returns
   */
  static async generateAndWrapKey(
    base64PublicKey: string
  ): Promise<JoseCryptoKeyObj> {}

  /**
   * Function to encrypt any data using AES-256-GCM.
   *
   * @static
   * @async
   * @param data Data to be encrypted.
   * @param key AES-256-GCM plaintext key to be used for encryption.
   * @returns
   */
  static async encryptData(data: any, key: CryptoKey): Promise<string> {}

  /**
   * Function to decrypt encrypted data using AES-256-GCM.
   *
   * @static
   * @async
   * @param payload AES-256-GCM encrypted string to decrypt.
   * @param key AES-256-GCM plaintext key to be used for encryption.
   * @returns
   */
  static async decryptData(payload: string, key: CryptoKey): Promise<any> {}
}
