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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var {
  ALGOGRITHM,
  OPTIONS,
  KEY_OPTIONS,
  PLAIN_TEXT_FORMAT,
  CIPHER_TEXT_FORMAT
} = _CONSTANTS.RSA_CONSTANTS;
var Rsa = {
  generateKey,
  encrypt,
  decrypt
};
var _default = Rsa;
exports.default = _default;
function generateKey() {
  return _generateKey.apply(this, arguments);
}
function _generateKey() {
  _generateKey = _asyncToGenerator(function* () {
    try {
      var keyPair = (0, _crypto.generateKeyPairSync)(ALGOGRITHM, KEY_OPTIONS);
      return keyPair;
    } catch (error) {
      var errorCode = "JoseCrypto::RSA_".concat(error.code);
      throw new _JoseCryptoError.default(error, {
        errorCode
      });
    }
  });
  return _generateKey.apply(this, arguments);
}
function encrypt() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var publicKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  _validateExistString(data, _ERRORS.INVALID_RSA_ENCRYPTION_DATA_ERROR);
  _validateExistString(publicKey, _ERRORS.INVALID_RSA_ENCRYPTION_KEY_ERROR);
  try {
    var pemString = derToPemString(publicKey, 'PUBLIC KEY');
    var encryptParams = _objectSpread({
      key: pemString
    }, OPTIONS);
    var dataBuffer = Buffer.from(data, PLAIN_TEXT_FORMAT);
    var cipherTextBuffer = (0, _crypto.publicEncrypt)(encryptParams, dataBuffer);
    var cipherTextString = cipherTextBuffer.toString(CIPHER_TEXT_FORMAT);
    return cipherTextString;
  } catch (error) {
    var errorCode = "JoseCrypto::RSA_".concat(error.code);
    throw new _JoseCryptoError.default(error, {
      errorCode
    });
  }
}
function decrypt() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var privateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  _validateExistString(payload, _ERRORS.INVALID_RSA_DECRYPTION_DATA_ERROR);
  _validateExistString(privateKey, _ERRORS.INVALID_RSA_DECRYPTION_KEY_ERROR);
  try {
    var pemString = derToPemString(privateKey, 'PRIVATE KEY');
    var decryptParams = _objectSpread({
      key: pemString
    }, OPTIONS);
    var payloadBuffer = Buffer.from(payload, CIPHER_TEXT_FORMAT);
    var plainTextBuffer = (0, _crypto.privateDecrypt)(decryptParams, payloadBuffer);
    var data = plainTextBuffer.toString(PLAIN_TEXT_FORMAT);
    return data;
  } catch (error) {
    var errorCode = "JoseCrypto::RSA_".concat(error.code);
    throw new _JoseCryptoError.default(error, {
      errorCode
    });
  }
}
function _validateExistString(string, errorMap) {
  if (typeof string !== 'string' || !string) {
    throw new _JoseCryptoError.default({}, errorMap);
  }
}
function derToPemString(key, keyType) {
  var prefix = "-----BEGIN ".concat(keyType, "-----\n");
  var postfix = "-----END ".concat(keyType, "-----");
  var pemString = prefix + key.match(/.{0,64}/g).join('\n') + postfix;
  return pemString;
}