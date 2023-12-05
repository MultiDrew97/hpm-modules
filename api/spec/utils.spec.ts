import { getAuth } from '../lib/utils'
import { IncomingHttpHeaders } from 'http'
import {
	ArgumentError,
	AuthorizationError,
	encode,
} from '@herbivore/core/utils'
import { IAuth } from '@herbivore/core/utils/interfaces'

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
