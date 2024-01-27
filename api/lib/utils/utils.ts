import { IAuth } from '@herbivore/core/utils/interfaces'
import { decode } from 'js-base64'

export { encode, decode } from 'js-base64'

export function getAuth(auth: string): IAuth {
	let parts = decode(auth.split(' ')[1]).split(':')

	return { username: parts[0], password: parts[1] }
}
