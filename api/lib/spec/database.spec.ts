import {connect, disconnect, ConnectOptions, Types} from "mongoose"
import {User, PasswordEntry} from "../database";
import {IPassEntry} from "@herbivore/core/utils/interfaces";
import {LoginError} from "@herbivore/core/utils/errors";
import {IPassEntryDoc} from "../database/models/password";

const options: ConnectOptions = {
	auth: {
		username: "arandlemiller97",
		password: "JasmineLove2697"
	},
	retryWrites: true,
	w: "majority",
	appName: "HPM"
}
const desiredPage: string = "HPM-Test"

const uri = `mongodb+srv://herbivores-password-man.wci8d.mongodb.net/${desiredPage}`

describe('Database User Schema', function () {
	const validUser = {
		id: "6260a5690814821a97aa218d",
		username: "username",
		password: "password"
	}
	const invalidUser = {
		id: (new Types.ObjectId()).toString(),
		username: "invalid",
		password: "invalidPassword"
	}
	beforeAll(async () => {
		await connect(uri, options)
	})
	afterAll(async () => {
		await disconnect()
	})

	it('should correctly login a user', async function () {
		await expectAsync(User.login(validUser)).toBeResolved()
		await expectAsync(User.login(invalidUser)).toBeRejectedWithError(LoginError)
	});

	it('should correctly retrieve users from database', async function () {
		await expectAsync(User.findById(validUser.id)).not.toBeResolvedTo(null)
		await expectAsync(User.findById(invalidUser.id)).toBeResolvedTo(null)
	});

	it('should correctly retrieve password entries', async function () {
		await expectAsync(User.find()).not.toBeRejected()
		await expectAsync(User.findById(validUser.id)).not.toBeResolvedTo(null)
		await expectAsync(User.findById(invalidUser.id)).toBeResolvedTo(null)
	});

	it("should correctly verify a user' password", async function () {
		await expectAsync(User.checkPassword(validUser.id, validUser.password))
			.withContext("Valid ID and password").toBeResolvedTo(true)

		await expectAsync(User.checkPassword(validUser.id, ""))
			.withContext("Valid ID, invalid password").toBeRejectedWithError(LoginError)

		await expectAsync(User.checkPassword(invalidUser.id, invalidUser.password))
			.withContext("Invalid ID and password").toBeRejectedWithError(LoginError)
	});
});

describe('Database Passwords Schema', function () {
	const validEntry = {
		id: "6278838c6ab5c4f5ebbf0a11"
	}
	const invalidEntry = {
		id: (new Types.ObjectId()).toString()
	}
	const userID: string = "6260a5690814821a97aa218d"

	beforeAll(async () => {
		await connect(uri, options)
	})

	afterAll(async () => {
		await disconnect()
	})

	let testEntry: IPassEntry = {
		name: "Test",
		login: {
			username: "test",
			password: "test",
			salt: userID
		},
		sites: [],
		passwordHistory: []
	}

	it('should properly retrieve password entries', async function () {
		await expectAsync(PasswordEntry.find()).not.toBeRejected()
		await expectAsync(PasswordEntry.findById(invalidEntry.id)).toBeResolvedTo(null)
		await expectAsync(PasswordEntry.findById(validEntry.id)).not.toBeResolvedTo(null)
	});

	it('should properly update the password for the entry', async function () {
		let testEntryDoc: IPassEntryDoc = await PasswordEntry.create(testEntry)
		const finalPassword = [ 'test5', 'test6', 'test7', 'test8', 'test9' ]

		for (let i = 1; i <= 10; i++) {
			await expectAsync(testEntryDoc.updatePassword(`test${i}`)).toBeResolvedTo(true)
		}

		expect(testEntryDoc.passwordHistory).toEqual(finalPassword)

		await PasswordEntry.findByIdAndDelete(testEntryDoc.id)
	});
});
