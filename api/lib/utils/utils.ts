import { IAuth, decode } from '@herbivore/core/utils'

export function getAuth(auth: string): IAuth {
	let parts = decode(auth.split(' ')[1]).split(':')

	return { username: parts[0], password: parts[1] }
}
