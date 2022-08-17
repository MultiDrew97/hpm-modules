import {connect, disconnect, ConnectOptions, Types} from "mongoose"
import {User, PasswordEntry} from "../database";

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
		await expectAsync(User.login(validUser)).toBeResolved()
		await expectAsync(User.login(invalidUser)).toBeRejected()
	});

	it('should correctly retrieve users from database', async function () {
		await expectAsync(User.find()).toBeResolved()
		await expectAsync(User.findById(invalidUser.id)).toBeRejectedWithError("Unknown user")
	});

	it('should correctly retrieve password entries', async function () {
		await expectAsync(User.findById(validUser.id)).toBeResolved()
		await expectAsync(User.findById(invalidUser.id)).toBeRejectedWithError("Unknown user")
	});

	it("should correctly verify a user' password", async function () {
		await expectAsync(User.checkPassword(validUser.id, validUser.password))
			.withContext("Valid ID and password").toBeResolvedTo(true)

		await expectAsync(User.checkPassword(validUser.id, ""))
			.withContext("Valid ID, invalid password").toBeRejectedWithError("Incorrect password")

		await expectAsync(User.checkPassword(invalidUser.id, invalidUser.password))
			.withContext("Invalid ID and password").toBeRejectedWithError("User not found")
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
