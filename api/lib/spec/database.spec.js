"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const functions_1 = require("./helpers/functions");
const errors_1 = require("@herbivore/core/utils/errors");
const options = {
    auth: {
        username: "arandlemiller97",
        password: "JasmineLove2697"
    },
    retryWrites: true,
    w: "majority",
    appName: "HPM"
};
const desiredPage = "HPM-Test";
const uri = `mongodb+srv://herbivores-password-man.wci8d.mongodb.net/${desiredPage}`;
const validUser = {
    id: "6260a5690814821a97aa218d",
    username: "username",
    password: "password"
};
const invalidUser = {
    id: (new mongoose_1.Types.ObjectId()).toString(),
    username: "invalid",
    password: "invalidPassword"
};
describe('Database User Schema', function () {
    beforeAll(async () => {
        await (0, mongoose_1.connect)(uri, options);
    });
    afterAll(async () => {
        await (0, mongoose_1.disconnect)();
    });
    it('should correctly login a user', async function () {
        expect(await (0, functions_1.login)(validUser)).toBeTrue();
        expect(await (0, functions_1.login)(invalidUser)).toBeFalse();
    });
    it('should correctly retrieve users from database', async function () {
        expect(await (0, functions_1.getUser)()).toBeDefined();
        expect(await (0, functions_1.getUser)("invalid")).toBeUndefined();
    });
    it('should correctly retrieve password entries', async function () {
        expect(await (0, functions_1.getPassEntry)(validUser.id)).toBeDefined();
        expect(await (0, functions_1.getPassEntry)(invalidUser.id)).toBeUndefined();
    });
    it("should correctly verify a user' password", async function () {
        expect(await (0, functions_1.checkPassword)(validUser.id, validUser.password))
            .withContext("Valid ID and password").toBeTrue();
        expect(await (0, functions_1.checkPassword)(validUser.id, ""))
            .withContext("Valid ID, invalid password").toThrow(errors_1.LoginError);
        expect(await (0, functions_1.checkPassword)(invalidUser.id, invalidUser.password))
            .withContext("Invalid ID and password").toThrowError(errors_1.LoginError, "User not found");
    });
});
/*describe('Database Passwords Schema', function () {
    beforeAll(async () => {
        await connect(uri, options)
    })

    afterAll(async () => {
        await disconnect()
    })


});*/
