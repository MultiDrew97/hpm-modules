"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
describe('Functions', function () {
    const value = 'value';
    describe('Encode', function () {
        it('should encode a value for url encoding consistently', function () {
            expect((0, utils_1.encode)(value)).toEqual((0, utils_1.encode)(value));
        });
        it('should decode a value ', function () {
            let encoded = (0, utils_1.encode)(value);
            expect((0, utils_1.decode)(encoded)).toEqual(value);
        });
    });
    describe('Encrypt', function () {
        it('should encrypt a given value', function () {
            let salt = 'salt';
            let encrypted = 'edcfc93e3a3010a74fdcf1e8ceedfeab';
            expect((0, utils_1.encrypt)(value, salt)).toEqual(encrypted);
        });
    });
    describe('Indexes', function () {
        it('should retrieve a consistent index', function () {
            let arr = ['test', 'value', 'another value'];
            let desired = 'value';
            let path = '';
            expect((0, utils_1.indexOf)(arr, desired, path)).toEqual(1);
        });
    });
});
