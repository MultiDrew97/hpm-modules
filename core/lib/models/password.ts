import { IEntry } from '../utils/interfaces'
import { Model, model, Schema, SchemaTypes, Document } from 'mongoose'
import { User } from './user'

export const CollectionName = {
	name: 'Entry',
	collection: 'Entries',
}

export interface IPassEntryDoc extends IEntry, Document {
	/**
	 * Update the password stored for the entry
	 * @param newPassword The new password to update to
	 */
	updatePassword(newPassword: string): Promise<any>

	/**
	 * Update the TOTP key for the specified entry
	 * @param totpKey The key to update to
	 */
	updateTotp(totpKey: string): Promise<any>
}

interface IPassEntryModel extends Model<IPassEntryDoc> {
	/**
	 * Create a new password entry and add to user's list
	 * @param userID ID of user to add to
	 * @param newEntry New entry to add
	 */
	addEntry(userID: string, newEntry: IEntry): Promise<boolean>
}

const entrySchema: Schema<IPassEntryDoc> = new Schema({
	name: {
		type: SchemaTypes.String,
		default: '',
	},
	sites: [
		{
			type: SchemaTypes.String,
			default: '',
		},
	],
	login: {
		username: {
			type: SchemaTypes.String,
			default: '',
		},
		password: {
			type: SchemaTypes.String,
			default: '',
		},
		salt: {
			type: SchemaTypes.String,
			default: '',
		},
	},
	passwordHistory: [
		{
			type: SchemaTypes.String,
			alias: 'history',
			default: '',
		},
	],
	totpKey: {
		type: SchemaTypes.String,
		alias: 'key',
		default: '',
	},
})

/*entrySchema.pre('save', function() {
	if (!this.isNew)
		return

	// this.login.salt = (new Types.ObjectId()).toString()
	console.debug(this.login.password)
	this.login.password = encrypt(this.login.password, this.login.salt)
	console.debug(this.login.password)
})*/

entrySchema.static('addEntry', function (userID: string, newEntry: IEntry): Promise<any> {
	return PassEntry.create(newEntry)
		.then((password) => {
			return User.addEntry(userID, password.id!)
		})
		.catch((reason) => {
			return Promise.reject(reason)
		})
})

entrySchema.method('updatePassword', function (newPassword: string): Promise<any> {
	if (this.passwordHistory.length >= 5) this.passwordHistory.shift()

	this.passwordHistory.push(this.login.password)

	// TODO: Is this encrypted before getting here?
	this.login.password = newPassword

	return this.save()
})

entrySchema.method('updateTotp', function (totpKey: string): Promise<any> {
	this.totpKey = totpKey
	return this.save()
})

/*function length(arr: (string | IPasswordEntryDoc)[]) {
	return arr.length <= 5
}*/

/**
 * Password model
 */
export const PassEntry = model<IPassEntryDoc, IPassEntryModel>(
	CollectionName.name,
	entrySchema,
	CollectionName.collection
)
