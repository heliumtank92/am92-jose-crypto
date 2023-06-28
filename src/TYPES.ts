/**
 * Type defination for error map to be passed to JoseCryptoErrorMap.
 *
 * @interface
 * @typedef {JoseCryptoErrorMap}
 */
export interface JoseCryptoErrorMap {
  /**
   * Overriding message string for JoseCryptoError instance
   */
  message?: string
  /**
   * Overriding error code string for JoseCryptoError instance
   */
  errorCode?: string
  /**
   * Overriding HTTP status code for JoseCryptoError instance
   */
  statusCode?: number
}
