import { connect, disconnect, Types } from 'mongoose'
import { User, PassEntry } from '../lib/database'
import { IDbConfig } from '@herbivore/core/utils/interfaces'
import { LoginError } from '@herbivore/core/utils/errors'

const dbConfig: IDbConfig = {
	options: {
		auth: {
			username: 'arandlemiller97',
			password: 'JasmineLove2697',
		},
		retryWrites: true,
		w: 'majority',
		dbName: 'HPM-Test',
	},
	desiredPage: 'HPM-Test',
	uri: `mongodb+srv://herbivores-password-man.wci8d.mongodb.net/`,
}

const validUser = {
	id: '6260a5690814821a97aa218d',
	username: 'username',
	password: 'password',
}
const invalidUser = {
	id: new Types.ObjectId().toString(),
	username: 'invalid',
	password: 'invalidPassword',
}

describe('Database User Schema', function () {
	beforeAll(async () => {
		await connect(<string>dbConfig.uri, dbConfig.options)
	})
	afterAll(async () => {
		await disconnect()
	})
})
