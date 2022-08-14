import {IAuth, IUser, IUserConfig} from "@herbivore/core/utils/interfaces";
import {model, Model, Schema, SchemaTypes, Types} from "mongoose";
import {encrypt, indexOf} from "@herbivore/core/utils/functions";
import {DEFAULT_CONFIG} from "@herbivore/core/utils/constants";
import {ArgumentError, DatabaseError, LoginError} from "@herbivore/core/utils/errors"
import {PasswordEntry} from "./password";

interface IUserDoc extends IUser {
}

interface IUserModel extends Model<IUserDoc> {
	login(auth: IAuth): Promise<boolean>
	checkPassword(id: string, password: string): Promise<boolean>
	isUniqueUsername(username: string): Promise<boolean>
	getSalt(id: string): Promise<string>
	addPassword(userID: string, entryID: string): void
	removePassword(userID: string, entryID: string): Promise<boolean>
	updatePassword(userID: string, newPassword: string): Promise<any>
	getUserConfig(userID: string): Promise<IUserConfig>
}

const userSchema: Schema<IUserDoc> = new Schema({
	name: {
		type: SchemaTypes.String,
		default: "John Doe"
	},
	username: {
		type: SchemaTypes.String,
		unique: true
	},
	password: {
		type: SchemaTypes.String,
		default: ''
	},
	salt: {
		type: SchemaTypes.String
	},
	email: {
		type: SchemaTypes.String,
		unique: true
	},
	entries: [{
		type: SchemaTypes.ObjectId,
		unique: true,
		ref: "PasswordEntry"
	}],
	config: {
		type: Object,
		default: DEFAULT_CONFIG
	}
})

userSchema.pre('save', function() {
	if (!this.isNew)
		return

	this.salt = (new Types.ObjectId()).toString()
	this.password = encrypt(this.password, this.salt)
})

userSchema.pre(/.*delete.*/i, function() {
	console.log(this.id)
	console.log(this.entries)
	for (let entry of this.entries) {
		PasswordEntry.findByIdAndDelete(entry)
	}
})

userSchema.pre(/find.*/, function() {
	this.populate('entries')
})

userSchema.static('updatePassword', function(userID: string, newPassword: string) {
	return User.findById(userID).then(user => {
		if (!user)
			throw new DatabaseError(`No user found with ID ${userID}`)

		user.password = encrypt(newPassword, user.salt)
		return user.save()
	})
})

userSchema.static('login', async function(auth: IAuth): Promise<IUserDoc> {
	// TODO: Determine what I actually need from the login
	let user = await this.findOne({username: auth.username}, 'id password salt')

	if (!user)
		throw new LoginError("Username not present")

	if (user.password !== (encrypt(auth.password, user.salt)))
		throw new LoginError("Incorrect password")

	return user
})

userSchema.static('checkPassword', async function(id: string, password: string): Promise<boolean> {
	// TODO: Determine what I actually need from the login
	let user = await this.findById(id, 'id password salt')

	if (!user)
		throw new LoginError("User not found")

	if (user.password !== (encrypt(password, user.salt)))
		throw new LoginError("Incorrect password")

	return true
})

userSchema.static('addPassword', function(userID: string, entryID: string) {
	return this.findById(userID).then((user: IUserDoc) => {
		user.entries.push(entryID)
		return user.save()
	})
})

userSchema.static('removePassword', function(userID: string, entryID: string): Promise<boolean> {
	return this.findById(userID).then((user: IUserDoc) => {
		console.log(entryID)
		console.log(user.entries)
		/*user.passwords.findIndex((item, index) => {
			if ((<IPasswordEntry>item).id == entryID)
				return index

			return -1
		})*/
		let index = indexOf(user.entries, entryID, 'id')
		console.log("FINAL INDEX: ", index)

		if (index < 0)
			throw new ArgumentError(`EntryID ${entryID} not present for UserID ${userID}`);

		const removed = user.entries.splice(index, 1);
		return user.save().then(_ => {
			return PasswordEntry.findByIdAndDelete(entryID).then(_ => {
				return true;
			});
		}).catch(async _ => {
			user.entries.push(removed[0]);
			await user.save()
			return false
		});
	});
})

userSchema.static('getSalt', async function(id: any): Promise<string> {
	return await User.findById(id).then(user => {
		if (!user)
			throw new DatabaseError(`Unable to find a user with id ${id}`)

		return user.password
	})
})

userSchema.static('getUserConfig', async function(userID: string): Promise<IUserConfig> {
	return await User.findById(userID, 'config').then(user => {
		if (!user)
			throw new DatabaseError(`Unable to find user with id ${userID}`)

		return user.config
	})
})

userSchema.static('isUniqueUsername', async function(username: string): Promise<boolean> {
	return await User.find({username: username}).then(user => {
		return user.length === 0
	})
})

export const User = model<IUserDoc, IUserModel>("User", userSchema, "Users")
