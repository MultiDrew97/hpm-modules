"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIDs = exports.verifyHeaders = exports.checkPassword = exports.login = exports.getUser = exports.getPassEntry = void 0;
const database_1 = require("../../database");
const utils_1 = require("../../utils");
const getPassEntry = async (userID) => {
    try {
        let user = await database_1.User.findById(userID);
        if (!user)
            throw new Error();
        return user.entries;
    }
    catch (_a) {
        return undefined;
    }
};
exports.getPassEntry = getPassEntry;
const getUser = async (username) => {
    let users = await (username ? database_1.User.find({ username }) : database_1.User.find());
    return users.length > 0 ? users : undefined;
};
exports.getUser = getUser;
const login = async (auth) => {
    try {
        await database_1.User.login(auth);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.login = login;
const checkPassword = async (id, password) => {
    try {
        return await database_1.User.checkPassword(id, password);
    }
    catch (e) {
        throw e;
    }
};
exports.checkPassword = checkPassword;
const verifyHeaders = (headers, regex, auth) => {
    try {
        (0, utils_1.validateHeaders)(headers, regex, auth);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.verifyHeaders = verifyHeaders;
const verifyIDs = (...ids) => {
    try {
        (0, utils_1.validateQueryID)(...ids);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.verifyIDs = verifyIDs;
