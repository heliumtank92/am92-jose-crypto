/**
 * Type defination for the keys returned from generateAndWrapKey function
 *
 * @typedef {JoseCryptoKeyObj}
 */
export type JoseCryptoKeyObj = {
  encryptionKey: CryptoKey
  encryptedEncryptionKey: string
}
