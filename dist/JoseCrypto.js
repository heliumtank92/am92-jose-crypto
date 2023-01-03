"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Rsa = _interopRequireDefault(require("./lib/Rsa.js"));
var _Aes = _interopRequireDefault(require("./lib/Aes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var JoseCrypto = {
  decryptKey: _Rsa.default.decrypt,
  encryptKey: _Rsa.default.encrypt,
  encryptData: _Aes.default.encrypt,
  decryptData: _Aes.default.decrypt
};
var _default = JoseCrypto;
exports.default = _default;