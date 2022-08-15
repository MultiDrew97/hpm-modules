"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const functions_1 = require("./helpers/functions");
const utils_2 = require("@herbivore/core/utils");
const mongoose_1 = require("mongoose");
let apiAuth = {
    username: "username",
    password: "password"
};
let authRegex = /Basic .+/;
let validHeader = {
    authorization: `Basic ${(0, utils_2.encode)(`${apiAuth.username}:${apiAuth.password}`)}`
};
let invalidHeader = {};
let validIDs = [new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId(), new mongoose_1.Types.ObjectId()];
let invalidIDs = ["123443", 123];
describe('General Utility Functions', function () {
    it('should correctly decode and parse the auth details from the header', function () {
        expect((0, utils_1.getAuth)(validHeader.authorization)).toEqual(apiAuth);
    });
    it('should verify proper headers are present', function () {
        expect((0, functions_1.verifyHeaders)(validHeader, authRegex, apiAuth)).toBeTrue();
        expect((0, functions_1.verifyHeaders)(invalidHeader, authRegex, apiAuth)).toBeFalse();
    });
    it('should correctly validate the query IDs', function () {
        expect((0, functions_1.verifyIDs)(...validIDs)).toBeTrue();
        expect((0, functions_1.verifyIDs)(...invalidIDs)).toBeFalse();
    });
});
