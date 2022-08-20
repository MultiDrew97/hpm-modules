import {IAuth, IPassEntry, IUser, IUserConfig} from "@herbivore/core/utils/interfaces";
import {model, Model, Schema, SchemaTypes, Types, Document} from "mongoose";
import {encrypt, indexOf, DEFAULT_CONFIG} from "@herbivore/core/utils";
import {ArgumentError, DatabaseError, LoginError} from "@herbivore/core/utils/errors"
import {PasswordEntry} from "./password";

export interface IUserDoc extends IUser, Document {
}

interface IUserModel extends Model<IUserDoc> {
	login(auth: IAuth): Promise<IUserDoc>
	checkPassword(id: string, password: string): Promise<boolean>
	isUniqueUsername(username: string): Promise<boolean>
	getSalt(id: string): Promise<string>
	addPassword(userID: string, entryID: string): Promise<IUserDoc>
	removePassword(userID: string, entryID: string): Promise<boolean>
	updatePassword(userID: string, newPassword: string): Promise<boolean>
	getUserConfig(userID: string): Promise<IUserConfig>
}

const userSchema: Schema<IUserDoc> = new Schema({
	name: {
		type: SchemaTypes.String,
		default: "John Doe"
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
	},
	login: {
		username: {
			type: SchemaTypes.String,
			unique: true
		},
		password: {
			type: SchemaTypes.String,
			default: ''
		},
		salt: {
			type: SchemaTypes.String,
			default: (new Types.ObjectId()).toString()
		},
	}
})

userSchema.pre('save', function() {
	if (!this.isNew)
		return

	// this.login.salt = (new Types.ObjectId()).toString()
	this.login.password = encrypt(this.login.password, this.login.salt)
})

userSchema.pre(/.*delete.*/i, function() {
	console.log(this.id)
	console.log(this.entries)
	for (let entry of this.entries) {
		PasswordEntry.findByIdAndDelete(entry)
	}
})

/*userSchema.pre(/find.*!/, function() {
	this.populate('entries')
})*/

userSchema.static('updatePassword', function(userID: string, newPassword: string) {
	return User.findById(userID).then(user => {
		if (!user)
			throw new DatabaseError(`Unknown userID ${userID}`)

		user.login.password = encrypt(newPassword, user.login.salt)
		return user.save().then(_ => {
			return true
		}).catch(_ => {
			return false
		})
	})
})

userSchema.static('login', async function(auth: IAuth): Promise<IUserDoc> {
	// TODO: Determine what I actually need from the login
	let user = await User.findOne({username: auth.username}, "id login")

	if (!user)
		throw new LoginError("Unknown username")

	if (user.login.password !== (encrypt(auth.password, user.login.salt)))
		throw new LoginError("Incorrect password")

	// MAYBE: Do I need the login info? Could I return the userID instead?
	return user
})

userSchema.static('checkPassword', async function(id: string, password: string): Promise<boolean> {
	// TODO: Determine what I actually need from the login
	let user = await User.findById(id, 'id login')

	if (!user)
		throw new LoginError(`Unknown userID ${id}`)


	if (user.login.password !== (encrypt(password, user.login.salt)))
		throw new LoginError("Incorrect password")

	return true
})

userSchema.static('addPassword', function(userID: string, entryID: string): Promise<IUserDoc> {
	return User.findById(userID).then((user: IUserDoc | null) => {
		if (!user)
			throw new ArgumentError(`Unknown user with userID ${userID}`)

		user.entries.push(entryID)
		return user.save()
	})
})

userSchema.static('removePassword', function(userID: string, entryID: string): Promise<boolean> {
	let removed: (IPassEntry | string)[]
	return User.findById(userID).then((user: IUserDoc | null) => {
		if (!user)
			throw new ArgumentError(`Unknown user with userID ${userID}`)

		let index = indexOf(user.entries, entryID, 'id')

		if (index < 0)
			throw new ArgumentError(`Unknown entryID ${entryID} for userID ${userID}`);

		removed = user.entries.splice(index, 1);
		return user.save().then(_ => {
			return PasswordEntry.findByIdAndDelete(entryID).then(_ => {
				return true;
			});
		}).catch(async _ => {
			if (removed.length > 0 && !user.entries.includes(removed[0])) {
				user.entries.push(removed[0]);
				await user.save()
			}

			return false
		});
	});
})

userSchema.static('getSalt', async function(id: any): Promise<string> {
	return await User.findById(id).then(user => {
		if (!user)
			throw new DatabaseError(`Unknown userID ${id}`)

		return user.login.password
	})
})

userSchema.static('getUserConfig', async function(userID: string): Promise<IUserConfig> {
	return await User.findById(userID, 'config').then(user => {
		if (!user)
			throw new DatabaseError(`Unknown userID ${userID}`)

		return user.config
	})
})

userSchema.static('isUniqueUsername', async function(username: string): Promise<boolean> {
	// MAYBE: find vs. findOne
	return await User.find({username: username}).then(user => {
		return user.length === 0
	})
})

export const User = model<IUserDoc, IUserModel>("User", userSchema, "Users")
