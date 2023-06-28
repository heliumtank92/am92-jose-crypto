import { SERVICE } from './CONFIG'
import { JoseCryptoErrorMap } from './TYPES'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Jose Crypto Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'JoseCrypto::GENERIC'

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
   * Flag to identify if error is a JoseCryptoError.
   */
  readonly _isJoseCryptoError = true
  /**
   * Node project from which Error is thrown.
   */
  readonly service: string
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
   * Creates an instance of JoseCryptoError.
   *
   * @constructor
   * @param [e] Any Error instance to wrap with JoseCryptoError.
   * @param [eMap] JoseCryptoErrorMap to rewrap error for better understanding.
   */
  constructor(e: any, eMap: JoseCryptoErrorMap) {
    super()

    this.service = SERVICE
    this.message = eMap?.message || e?.message || DEFAULT_ERROR_MSG
    this.statusCode = eMap?.statusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = eMap?.errorCode || e?.code || DEFAULT_ERROR_CODE
    this.error = e
  }
}
