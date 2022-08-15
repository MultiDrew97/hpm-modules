"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const functions_1 = require("@herbivore/core/utils/functions");
const constants_1 = require("@herbivore/core/utils/constants");
const errors_1 = require("@herbivore/core/utils/errors");
const password_1 = require("./password");
const userSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        default: "John Doe"
    },
    username: {
        type: mongoose_1.SchemaTypes.String,
        unique: true
    },
    password: {
        type: mongoose_1.SchemaTypes.String,
        default: ''
    },
    salt: {
        type: mongoose_1.SchemaTypes.String
    },
    email: {
        type: mongoose_1.SchemaTypes.String,
        unique: true
    },
    entries: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            unique: true,
            ref: "PasswordEntry"
        }],
    config: {
        type: Object,
        default: constants_1.DEFAULT_CONFIG
    }
});
userSchema.pre('save', function () {
    if (!this.isNew)
        return;
    this.salt = (new mongoose_1.Types.ObjectId()).toString();
    this.password = (0, functions_1.encrypt)(this.password, this.salt);
});
userSchema.pre(/.*delete.*/i, function () {
    console.log(this.id);
    console.log(this.entries);
    for (let entry of this.entries) {
        password_1.PasswordEntry.findByIdAndDelete(entry);
    }
});
userSchema.pre(/find.*/, function () {
    this.populate('entries');
});
userSchema.static('updatePassword', function (userID, newPassword) {
    return exports.User.findById(userID).then(user => {
        if (!user)
            throw new errors_1.DatabaseError(`No user found with ID ${userID}`);
        user.password = (0, functions_1.encrypt)(newPassword, user.salt);
        return user.save();
    });
});
userSchema.static('login', async function (auth) {
    // TODO: Determine what I actually need from the login
    let user = await this.findOne({ username: auth.username }, 'id password salt');
    if (!user)
        throw new errors_1.LoginError("Username not present");
    if (user.password !== ((0, functions_1.encrypt)(auth.password, user.salt)))
        throw new errors_1.LoginError("Incorrect password");
    return user;
});
userSchema.static('checkPassword', async function (id, password) {
    // TODO: Determine what I actually need from the login
    let user = await this.findById(id, 'id password salt');
    if (!user)
        throw new errors_1.LoginError("User not found");
    if (user.password !== ((0, functions_1.encrypt)(password, user.salt)))
        throw new errors_1.LoginError("Incorrect password");
    return true;
});
userSchema.static('addPassword', function (userID, entryID) {
    return this.findById(userID).then((user) => {
        user.entries.push(entryID);
        return user.save();
    });
});
userSchema.static('removePassword', function (userID, entryID) {
    return this.findById(userID).then((user) => {
        console.log(entryID);
        console.log(user.entries);
        /*user.passwords.findIndex((item, index) => {
            if ((<IPasswordEntry>item).id == entryID)
                return index

            return -1
        })*/
        let index = (0, functions_1.indexOf)(user.entries, entryID, 'id');
        console.log("FINAL INDEX: ", index);
        if (index < 0)
            throw new errors_1.ArgumentError(`EntryID ${entryID} not present for UserID ${userID}`);
        const removed = user.entries.splice(index, 1);
        return user.save().then(_ => {
            return password_1.PasswordEntry.findByIdAndDelete(entryID).then(_ => {
                return true;
            });
        }).catch(async (_) => {
            user.entries.push(removed[0]);
            await user.save();
            return false;
        });
    });
});
userSchema.static('getSalt', async function (id) {
    return await exports.User.findById(id).then(user => {
        if (!user)
            throw new errors_1.DatabaseError(`Unable to find a user with id ${id}`);
        return user.password;
    });
});
userSchema.static('getUserConfig', async function (userID) {
    return await exports.User.findById(userID, 'config').then(user => {
        if (!user)
            throw new errors_1.DatabaseError(`Unable to find user with id ${userID}`);
        return user.config;
    });
});
userSchema.static('isUniqueUsername', async function (username) {
    return await exports.User.find({ username: username }).then(user => {
        return user.length === 0;
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema, "Users");
