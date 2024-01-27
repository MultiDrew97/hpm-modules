import { getAuth } from '../lib/utils/index.js'
import { IncomingHttpHeaders } from 'http'
import { IAuth } from '@herbivore/core/utils/interfaces'
import { encode } from '../lib/utils'

let apiAuth: IAuth = {
	username: 'username',
	password: 'password',
}

let authRegex: RegExp = /Basic .+/

let validHeader: IncomingHttpHeaders = {
	authorization: `Basic ${encode(`${apiAuth.username}:${apiAuth.password}`)}`,
}

let invalidHeader: IncomingHttpHeaders = {}

describe('General Utility Functions', function () {
	it('should correctly decode and parse the auth details from the header', function () {
		expect(getAuth(validHeader.authorization!)).toEqual(apiAuth)
	})
})
