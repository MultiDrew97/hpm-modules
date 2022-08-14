"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../utils/functions");
describe('Functions', function () {
    var value = "value";
    describe('Encode', function () {
        it('should encode a value for url encoding consistently', function () {
            expect((0, functions_1.encode)(value)).toEqual((0, functions_1.encode)(value));
        });
        it('should decode a value ', function () {
            var encoded = (0, functions_1.encode)(value);
            expect((0, functions_1.decode)(encoded)).toEqual(value);
        });
    });
    describe('Encrypt', function () {
        it('should encrypt a given value', function () {
            var salt = "salt";
            var encrypted = "edcfc93e3a3010a74fdcf1e8ceedfeab";
            expect((0, functions_1.encrypt)(value, salt)).toEqual(encrypted);
        });
    });
    describe('Indexes', function () {
        it('should retrieve a consistent index', function () {
            var arr = ["test", "value", "another value"];
            var desired = "value";
            var path = "";
            expect((0, functions_1.indexOf)(arr, desired, path)).toEqual(1);
        });
    });
});
