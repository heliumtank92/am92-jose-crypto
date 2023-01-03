"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crypto = require("crypto");
var _JoseCryptoError = _interopRequireDefault(require("../JoseCryptoError.js"));
var _CONSTANTS = require("../CONSTANTS.js");
var _ERRORS = require("../ERRORS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var {
  ALGORITHM,
  KEY_FORMAT,
  KEY_LENGTH,
  KEY_STRING_LENGTH,
  IV_FORMAT,
  IV_LENGTH,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT,
  AUTH_TAG_LENGTH,
  DATA_SEPARATOR
} = _CONSTANTS.AES_CONSTANTS;
var Aes = {
  generateKey,
  encrypt,
  decrypt
};
var _default = Aes;
exports.default = _default;
function generateKey() {
  var key = (0, _crypto.randomBytes)(KEY_LENGTH).toString(KEY_FORMAT);
  return key;
}
function encrypt(data) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  _validateEncryptionParams(key);
  var keyBuffer = Buffer.from(key, KEY_FORMAT);
  var ivBuffer = (0, _crypto.randomBytes)(IV_LENGTH);
  var ivString = ivBuffer.toString(IV_FORMAT);
  var stringifiedData = JSON.stringify({
    data
  });
  try {
    var encryptor = (0, _crypto.createCipheriv)(ALGORITHM, keyBuffer, ivBuffer, {
      authTagLength: AUTH_TAG_LENGTH
    });
    var cipherTextBuffer = Buffer.concat([encryptor.update(stringifiedData, PLAIN_TEXT_FORMAT), encryptor.final()]);
    var cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT);
    var authTagBuffer = encryptor.getAuthTag();
    var authTagString = authTagBuffer.toString(CIPHER_TEXT_FORMAT);
    var payload = [ivString, authTagString, cipherTextString].join(DATA_SEPARATOR);
    return payload;
  } catch (error) {
    var errorCode = "JoseCrypto::AES_".concat(error.code);
    throw new _JoseCryptoError.default(error, {
      errorCode
    });
  }
}
function decrypt(payload, key) {
  _validateDecryptionParams(key, payload);
  var keyBuffer = Buffer.from(key, KEY_FORMAT);
  var [ivString, authTagString, cipherTextString] = payload.split(DATA_SEPARATOR);
  var ivBuffer = Buffer.from(ivString, IV_FORMAT);
  var authTagBuffer = Buffer.from(authTagString, CIPHER_TEXT_FORMAT);
  var cipherTextBuffer = Buffer.from(cipherTextString, CIPHER_TEXT_FORMAT);
  try {
    var decryptor = (0, _crypto.createDecipheriv)(ALGORITHM, keyBuffer, ivBuffer);
    decryptor.setAuthTag(authTagBuffer);
    var plainTextBuffer = Buffer.concat([decryptor.update(cipherTextBuffer), decryptor.final()]);
    var plainTextString = plainTextBuffer.toString(PLAIN_TEXT_FORMAT);
    var {
      data
    } = JSON.parse(plainTextString);
    return data;
  } catch (error) {
    var errorCode = "JoseCrypto::AES_".concat(error.code);
    throw new _JoseCryptoError.default(error, {
      errorCode
    });
  }
}
function _validateEncryptionParams(key) {
  if (!key) {
    throw new _JoseCryptoError.default({}, _ERRORS.INVALID_AES_ENCRYPTION_PARAMS_ERROR);
  }
  if (key.length !== KEY_STRING_LENGTH) {
    throw new _JoseCryptoError.default({}, _ERRORS.INVALID_AES_ENCRYPTION_PARAMS_ERROR);
  }
}
function _validateDecryptionParams(key, payload) {
  if (!key || !payload) {
    throw new _JoseCryptoError.default({}, _ERRORS.INVALID_AES_DECRYPTION_PARAMS_ERROR);
  }
  if (key.length !== KEY_STRING_LENGTH) {
    throw new _JoseCryptoError.default({}, _ERRORS.INVALID_AES_KEY_STRING_LENGTH_ERROR);
  }
  if (payload.split(DATA_SEPARATOR).length !== 3) {
    throw new _JoseCryptoError.default({}, _ERRORS.INVALID_AES_DECRYPTION_PAYLOAD_ERROR);
  }
}