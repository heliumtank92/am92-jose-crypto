import { SERVICE } from './CONFIG.mjs'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Jose Crypto Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'JOSE_CRYPTO_ERROR'

/**
 * Error class whose instance is thrown in case of any error.
 *
 * @class
 * @typedef {JoseCryptoError}
 * @extends {Error}
 */
export default class JoseCryptoError extends Error {
  /**
   * Flag to identify if error is a custom error.
   */
  readonly _isCustomError = true
  /**
   * Flag to identoify if error is a JoseCryptoSubtleError.
   */
  readonly _isJoseCryptoError = true
  /**
   * Node project from which Error is thrown.
   */
  service: string = SERVICE
  /**
   * Error's message string.
   */
  message: string
  /**
   * HTTP status code associated with the error.
   */
  statusCode: number
  /**
   * Error Code.
   */
  errorCode: string
  /**
   * Error object.
   */
  error?: any
  /**
   * Creates an instance of JoseCryptoSubtleError.
   *
   * @constructor
   * @param [e] DOMException instance to wrap with JoseCryptoSubtleError.
   * @param [eMap] JoseCryptoSubtleErrorMap to rewrap error for better understanding.
   */
  constructor(e = {}, eMap) {
    if (e._isCustomError && !eMap) {
      return e
    }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const { message: eMessage, msg: eMsg, code: eCode } = e

    this.service = SERVICE
    this.message = message || eMessage || eMsg || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || eCode || DEFAULT_ERROR_CODE
    this.error = e
  }
}
