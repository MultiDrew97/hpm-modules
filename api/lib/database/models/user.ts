import {IAuth, IPassEntry, IUser, IUserConfig} from "@herbivore/core/utils/interfaces";
import {model, Model, Schema, SchemaTypes, Types, Document} from "mongoose";
import { encrypt, DEFAULT_CONFIG } from '@herbivore/core/utils'
import {
	ArgumentError,
	DatabaseError,
	LoginError,
} from '@herbivore/core/utils/errors'
import { PassEntry, CollectionName as passName } from './password'

const CollectionName = {
	name: 'User',
	collection: 'Users',
}

export interface IUserDoc extends IUser, Document {}

interface IUserModel extends Model<IUserDoc> {
	/**
	 * Attempt to log in using the provided credentials
	 *
	 * @param auth The credentials for the user attempting to login
	 */
	login(auth: IAuth): Promise<IUser>

	/**
	 * Check the password is valid for specified user
	 * @param id ID of desired user
	 * @param password The password to be checked
	 */
	checkPassword(id: string, password: string): Promise<boolean>

	/**
	 * Verifies if username provided is unique
	 * @param username Username to check for
	 */
	isUniqueUsername(username: string): Promise<boolean>

	/**
	 * Get the salt for the specified user
	 * @param id The ID of the user to get the salt from
	 */
	getSalt(id: string): Promise<string>

	/**
	 * Add a new entry for the specified user
	 * @param userID The ID of the user to add the new entry to
	 * @param entryID The ID of the new entry to add
	 */
	addEntry(userID: string, entryID: string): Promise<any>

	/**
	 * Remove specified entry from specified user's entry list
	 * @param userID The ID of the user to remove the entry from
	 * @param entryID The ID of the entry to remove
	 */
	removeEntry(userID: string, entryID: string): Promise<boolean>

	/**
	 * Update a user's master password
	 * @param userID The ID of the user to change master password
	 * @param newPassword The new password to change master to
	 */
	updatePassword(userID: string, newPassword: string): Promise<boolean>

	/**
	 * Get the config for the specified users
	 * @param userID The ID of the user whose config to get
	 */
	getUserConfig(userID: string): Promise<IUserConfig>

	/**
	 * Update the config of a desired user
	 * @param userID The ID of the user to update their config
	 * @param newConfig The new data for the config
	 */
	updateUserConfig(userID: string, newConfig: IUserConfig): Promise<boolean>
}

const userSchema: Schema<IUserDoc> = new Schema({
	name: {
		type: SchemaTypes.String,
		default: 'John Doe',
	},
	email: {
		type: SchemaTypes.String,
		unique: true,
		required: true,
	},
	entries: [
		{
			type: SchemaTypes.ObjectId,
			unique: true,
			ref: passName.name,
		},
	],
	config: {
		type: Object,
		default: DEFAULT_CONFIG,
	},
	login: {
		username: {
			type: SchemaTypes.String,
			unique: true,
			required: true,
		},
		password: {
			type: SchemaTypes.String,
			required: true,
		},
		salt: {
			type: SchemaTypes.String,
			default: new Types.ObjectId().toString(),
		},
	},
})

userSchema.pre('save', function () {
	if (!this.isNew) return

	// this.login.salt = (new Types.ObjectId()).toString()
	this.login.password = encrypt(this.login.password, this.login.salt)
})

userSchema.pre(/.*delete.*/i, function () {
	console.log(this.id)
	console.log(this.entries)
	for (let entry of this.entries) {
		PassEntry.findByIdAndDelete(entry)
	}
})

/*userSchema.pre(/find.*!/, function() {
	this.populate('entries')
})*/

userSchema.static(
	'updatePassword',
	async function (userID: string, newPassword: string) {
		return User.findById(userID)
			.then((user) => {
				if (!user) throw new DatabaseError(`Unknown userID ${userID}`)

				user.login.password = encrypt(newPassword, user.login.salt)
				return user.save()
			})
			.catch((reason) => {
				return Promise.reject(reason)
			})
	}
)

userSchema.static('login', async function (auth: IAuth): Promise<IUser> {
	// TODO: Determine what I actually need from the login
	return User.findOne({ username: auth.username }, 'id login').then(
		(user) => {
			if (!user) throw new LoginError('Unknown username')

			if (user.login.password !== encrypt(auth.password, user.login.salt))
				throw new LoginError('Incorrect password')

			return user
		}
	)
})

userSchema.static(
	'checkPassword',
	async function (userID: string, password: string): Promise<boolean> {
		// TODO: Determine what I actually need from the login
		let user = await User.findById(userID, 'id login')

		if (!user) throw new LoginError(`Unknown userID ${userID}`)

		if (user.login.password !== encrypt(password, user.login.salt))
			throw new LoginError('Incorrect password')

		return true
	}
)

userSchema.static(
	'addEntry',
	async function (userID: string, entryID: string): Promise<any> {
		return User.findById(userID).then((user: IUserDoc | null) => {
			if (!user) throw new ArgumentError(`Unknown userID ${userID}`)

			user.entries.push(entryID)
			return user.save()
		})
	}
)

userSchema.static(
	'removeEntry',
	async function (userID: string, entryID: string): Promise<boolean> {
		let removed: (IPassEntry | string)[]
		return User.findById(userID).then((user: IUserDoc | null) => {
			if (!user) throw new ArgumentError(`Unknown userID ${userID}`)

			let index = user.entries.indexOf(entryID)
			/*let index = user.entries.findIndex((value, index, arr) => {

		})*/

			if (index < 0)
				throw new ArgumentError(
					`Unknown entryID ${entryID} for userID ${userID}`
				)

			removed = user.entries.splice(index, 1)
			return user
				.save()
				.then((_) => {
					return PassEntry.findByIdAndDelete(entryID).then((_) => {
						return true
					})
				})
				.catch(async (_) => {
					if (
						removed.length > 0 &&
						!user.entries.includes(removed[0])
					) {
						user.entries.push(removed[0])
						await user.save()
					}

					return false
				})
		})
	}
)

userSchema.static('getSalt', async function (userID: any): Promise<string> {
	return await User.findById(userID).then((user) => {
		if (!user) throw new DatabaseError(`Unknown userID ${userID}`)

		return user.login.password
	})
})

userSchema.static(
	'getUserConfig',
	async function (userID: string): Promise<IUserConfig> {
		return await User.findById(userID, 'config').then((user) => {
			if (!user) throw new DatabaseError(`Unknown userID ${userID}`)

			return user.config
		})
	}
)

userSchema.static(
	'updateUserConfig',
	async function (userID: string, newConfig: IUserConfig) {
		return User.findById(userID).then((user) => {
			if (!user) throw new DatabaseError(`Unknown userID ${userID}`)

			user.config = newConfig

			return user.save()
		})
	}
)

userSchema.static(
	'isUniqueUsername',
	async function (username: string): Promise<boolean> {
		// MAYBE: find vs. findOne
		return await User.find({ 'login.username': username }).then((user) => {
			return user.length === 0
		})
	}
)

/**
 * User model used to manage user's entries and user's data
 */
export const User: IUserModel = model<IUserDoc, IUserModel>(
	CollectionName.name,
	userSchema,
	CollectionName.collection
)











