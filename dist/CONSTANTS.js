"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSA_CONSTANTS = exports.AES_CONSTANTS = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var RSA_CONSTANTS = {
  ALGOGRITHM: 'rsa',
  OPTIONS: {
    padding: _crypto.default.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  PLAIN_TEXT_FORMAT: 'base64',
  CIPHER_TEXT_FORMAT: 'base64',
  KEY_OPTIONS: {
    modulusLength: 2048
  }
};
exports.RSA_CONSTANTS = RSA_CONSTANTS;
var AES_KEY_LENGTH = 32;
var AES_KEY_STRING_LENGTH = 4 * Math.ceil(AES_KEY_LENGTH / 3);
var AES_CONSTANTS = {
  ALGORITHM: 'aes-256-gcm',
  KEY_FORMAT: 'base64',
  KEY_LENGTH: AES_KEY_LENGTH,
  KEY_STRING_LENGTH: AES_KEY_STRING_LENGTH,
  IV_FORMAT: 'base64',
  IV_LENGTH: 16,
  PLAIN_TEXT_FORMAT: 'utf8',
  CIPHER_TEXT_FORMAT: 'base64',
  AUTH_TAG_LENGTH: 16,
  DATA_SEPARATOR: '.'
};
exports.AES_CONSTANTS = AES_CONSTANTS;