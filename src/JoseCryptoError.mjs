const DEFAULT_ERROR_MSG = 'Jose Crypto Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'JOSE_CRYPTO_ERROR'

export default class JoseCryptoError extends Error {
  constructor (e = {}, eMap) {
    if (e._isCustomError && !eMap) { return e }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const {
      message: eMessage,
      msg: eMsg,
      code: eCode
    } = e

    const {
      npm_package_name: pkgName = '',
      npm_package_version: pkgVersion = ''
    } = process.env
    const service = `${pkgName}@${pkgVersion}`

    this._isCustomError = true
    this._isJoseCryptoError = true
    this.service = service
    this.message = message || eMessage || eMsg || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || eCode || DEFAULT_ERROR_CODE
    this.error = {
      ...e,
      message: eMessage || this.message,
      errorCode: this.errorCode
    }
  }
}
