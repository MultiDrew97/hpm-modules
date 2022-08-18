import { IPassEntry } from "@herbivore/core/utils/interfaces";
import {Model, model, Schema, SchemaTypes, Document} from "mongoose";
import {User} from "./user";

export interface IPassEntryDoc extends IPassEntry, Document {
	updatePassword(newPassword: string): Promise<boolean>
}

interface IPassEntryModel extends Model<IPassEntryDoc> {
	addEntry(userID: string, newEntry: IPassEntry): Promise<boolean>
}

const entrySchema: Schema<IPassEntryDoc> = new Schema({
	name: {
		type: SchemaTypes.String,
		default: ""
	},
	sites: [{
		type: SchemaTypes.String,
		default: ""
	}],
	login: {
		username: {
			type: SchemaTypes.String,
			default: ""
		},
		password: {
			type: SchemaTypes.String,
			default: ""
		},
		salt: {
			type: SchemaTypes.String,
			default: ""
		}
	},
	passwordHistory: [{
		type: SchemaTypes.String,
		alias: "history",
		default: ""
	}]
})

/*entrySchema.pre('save', function() {
	if (!this.isNew)
		return

	// this.login.salt = (new Types.ObjectId()).toString()
	console.debug(this.login.password)
	this.login.password = encrypt(this.login.password, this.login.salt)
	console.debug(this.login.password)
})*/

entrySchema.static('addEntry', function(userID: string, newEntry: IPassEntry): Promise<boolean> {
	return PasswordEntry.create(newEntry).then(password => {
		return User.addPassword(userID, password.id).then(_ => {
			return true
		}).catch(_ => {
			return false
		})
	}).catch(_ => {
		return false
	})
})

entrySchema.method('updatePassword', function (newPassword: string): Promise<boolean> {
	/*
		TODO: Test this to make sure it works properly
	 */
	// Add the old password to the list of previous passwords, then save the new one
	console.debug(this)

	console.log(this.passwordHistory.length)
	if (this.passwordHistory.length >= 5)
		this.passwordHistory.shift()

	this.passwordHistory.push(this.login.password)

	this.login.password = newPassword

	console.debug(this)

	return this.save().then(() => {
		return true
	}).catch(() => {
		return false
	})
})

/*function length(arr: (string | IPasswordEntryDoc)[]) {
	return arr.length <= 5
}*/

export const PasswordEntry = model<IPassEntryDoc, IPassEntryModel>("PasswordEntry", entrySchema, "PasswordEntries")
