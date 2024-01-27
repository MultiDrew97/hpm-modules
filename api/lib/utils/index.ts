export * from './utils'

export { encode, decode } from 'js-base64'

export const API_PATHS = {
	passwords: '/api/passwords',
	login: '/api/login',
	checkPass: '/api/login/:userID',
	users: '/api/users',
	userPass: '/api/users/:userID',
	config: '/api/users/:userID/config',
}

export enum API_CODES {
	SUCCESS = 200,
	ERROR = 500,
	CREATED = 201,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
}
