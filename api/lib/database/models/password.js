"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordEntry = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("./user");
const entrySchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        default: ""
    },
    sites: [{
            type: mongoose_1.SchemaTypes.String,
            default: ""
        }],
    login: {
        username: {
            type: mongoose_1.SchemaTypes.String,
            default: ""
        },
        password: {
            type: mongoose_1.SchemaTypes.String,
            default: ""
        },
        salt: {
            type: mongoose_1.SchemaTypes.String,
            default: ""
        }
    },
    passwordHistory: [{
            type: mongoose_1.SchemaTypes.String,
            alias: "history",
            default: ""
        }]
});
/*entrySchema.pre('save', function() {
    if (!this.isNew)
        return

    // this.login.salt = (new Types.ObjectId()).toString()
    console.debug(this.login.password)
    this.login.password = encrypt(this.login.password, this.login.salt)
    console.debug(this.login.password)
})*/
entrySchema.static('addEntry', function (userID, newEntry) {
    return exports.PasswordEntry.create(newEntry).then(password => {
        user_1.User.addPassword(userID, password.id);
    });
});
entrySchema.method('updatePassword', function (newPassword) {
    /*
        TODO: Test this to make sure it works properly
     */
    // Add the old password to the list of previous passwords, then save the new one
    console.debug(this);
    console.log(this.passwordHistory.length);
    if (this.passwordHistory.length >= 5)
        this.passwordHistory.shift();
    this.passwordHistory.push(this.login.password);
    this.login.password = newPassword;
    console.debug(this);
    return this.save().then(() => {
        return true;
    }).catch(() => {
        return false;
    });
});
/*function length(arr: (string | IPasswordEntryDoc)[]) {
    return arr.length <= 5
}*/
exports.PasswordEntry = (0, mongoose_1.model)("PasswordEntry", entrySchema, "PasswordEntries");
