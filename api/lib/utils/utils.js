"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = exports.validateQueryID = exports.validateHeaders = void 0;
const utils_1 = require("@herbivore/core/utils");
const mongoose_1 = require("mongoose");
function validateHeaders(headers, authRegex, apiAuth) {
    if (!headers.authorization)
        throw new utils_1.AuthorizationError("No authorization present");
    if (!authRegex.test(headers.authorization))
        throw new utils_1.AuthorizationError("Incorrect authorization given");
    let auth = getAuth(headers.authorization);
    if (auth.username !== apiAuth.username)
        throw new utils_1.AuthorizationError("Invalid username");
    if (auth.password !== apiAuth.password)
        throw new utils_1.AuthorizationError("Incorrect Password");
}
exports.validateHeaders = validateHeaders;
function validateQueryID(...ids) {
    for (let id of ids) {
        if (id && !mongoose_1.Types.ObjectId.isValid(id))
            throw new utils_1.ArgumentError(`ID ${id} is not a valid ObjectID`);
    }
}
exports.validateQueryID = validateQueryID;
function getAuth(auth) {
    let decodedAuth = (0, utils_1.decode)(auth.split(" ")[1]).split(":");
    return {
        username: decodedAuth[0],
        password: decodedAuth[1]
    };
}
exports.getAuth = getAuth;
