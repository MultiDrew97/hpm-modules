"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.encrypt = exports.indexOf = exports.Convert = void 0;
var ts_md5_1 = require("ts-md5");
var conversion_1 = require("./conversion");
Object.defineProperty(exports, "Convert", { enumerable: true, get: function () { return conversion_1.Convert; } });
/**
 * Returns the index of the provided value in the provided array
 * @param array The array to search through
 * @param value The value to search for
 * @param path The JSON path to the value
 */
function indexOf(array, value, path) {
    if (path === void 0) { path = ""; }
    return array.findIndex(function (item) {
        switch (typeof item) {
            case "string":
            case "number":
                return item === value;
            default:
                return item[path] === value;
        }
    });
}
exports.indexOf = indexOf;
/**
 * Encrypt a given string value using the provided salt value
 * @param plainText The plain text to encrypt
 * @param salt The salt for the encryption, any
 */
function encrypt(plainText, salt) {
    // FIXME: Replace encryption with sha256
    return ts_md5_1.Md5.hashStr("".concat(plainText).concat(salt));
}
exports.encrypt = encrypt;
/**
 * Perform Url encoding
 * @param value The value to encode
 */
function encode(value) {
    return btoa(value);
}
exports.encode = encode;
/**
 * Perform Url decoding
 * @param value The value to decode
 */
function decode(value) {
    return atob(value);
}
exports.decode = decode;
