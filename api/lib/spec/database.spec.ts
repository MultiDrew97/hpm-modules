import {connect, disconnect, ConnectOptions, Types} from "mongoose"
import {login, getUser, getPassEntry, checkPassword} from "./helpers/functions"
import {LoginError} from "@herbivore/core/utils/errors";

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

describe('Database User Schema', function () {
	beforeAll(async () => {
		await connect(uri, options)
	})
	afterAll(async () => {
		await disconnect()
	})

	it('should correctly login a user', async function () {
		expect(await login(validUser)).toBeTrue()
		expect(await login(invalidUser)).toBeFalse()
	});

	it('should correctly retrieve users from database', async function () {
		expect(await getUser()).toBeDefined()
		expect(await getUser("invalid")).toBeUndefined()
	});

	it('should correctly retrieve password entries', async function () {
		expect(await getPassEntry(validUser.id)).toBeDefined()
		expect(await getPassEntry(invalidUser.id)).toBeUndefined()
	});

	it("should correctly verify a user' password", async function () {
		expect(await checkPassword(validUser.id, validUser.password))
			.withContext("Valid ID and password").toBeTrue()

		expect(await checkPassword(validUser.id, ""))
			.withContext("Valid ID, invalid password").toThrow(LoginError)

		expect(await checkPassword(invalidUser.id, invalidUser.password))
			.withContext("Invalid ID and password").toThrowError(LoginError, "User not found")
	});
});

/*describe('Database Passwords Schema', function () {
	beforeAll(async () => {
		await connect(uri, options)
	})

	afterAll(async () => {
		await disconnect()
	})


});*/
