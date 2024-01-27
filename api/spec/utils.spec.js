"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../lib/utils/index.js");
const utils_1 = require("../lib/utils");
let apiAuth = {
    username: 'username',
    password: 'password',
};
let authRegex = /Basic .+/;
let validHeader = {
    authorization: `Basic ${(0, utils_1.encode)(`${apiAuth.username}:${apiAuth.password}`)}`,
};
let invalidHeader = {};
describe('General Utility Functions', function () {
    it('should correctly decode and parse the auth details from the header', function () {
        expect((0, index_js_1.getAuth)(validHeader.authorization)).toEqual(apiAuth);
    });
});
