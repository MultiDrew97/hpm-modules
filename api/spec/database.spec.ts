import { connect, disconnect, Types } from 'mongoose'
import { IDbConfig } from '@herbivore/core/utils/interfaces'

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

describe('Database User Schema', function () {
	beforeAll(async () => {
		await connect(<string>dbConfig.uri, dbConfig.options)
	})
	afterAll(async () => {
		await disconnect()
	})
})
