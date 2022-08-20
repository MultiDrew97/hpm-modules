import {IncomingHttpHeaders} from "http";
import {ArgumentError, AuthorizationError, decode} from "@herbivore/core/utils";
import {IAuth} from "@herbivore/core/utils/interfaces";
import {Types} from "mongoose";

export function validateHeaders(headers: IncomingHttpHeaders, authRegex: RegExp, apiAuth: IAuth) {
	if (!headers.authorization)
		throw new AuthorizationError("No authorization present")

	if (!authRegex.test(headers.authorization))
		throw new AuthorizationError("Incorrect authorization given")

	let auth: IAuth = getAuth(headers.authorization)

	if (auth.username !== apiAuth.username)
		throw new AuthorizationError("Invalid username")

	if (auth.password !== apiAuth.password)
		throw new AuthorizationError("Incorrect Password")
}

export function validateQueryID(...ids: any) {
	let invalidIDs = []
	for (let id of ids) {
		if (id && !Types.ObjectId.isValid(id))
			invalidIDs.push(id)
	}

	if (invalidIDs.length > 0) {
		let idStrings = invalidIDs
			.map((value, index, array) => index > array.length - 1 ? `'${value}'` : `'${value}'`)
			.join(invalidIDs.length === 2 ? " and " : ", ")

		let tail = invalidIDs.length > 1 ? 'are not valid IDs' : 'is not a valid ID'
		throw new ArgumentError(`${idStrings} ${tail}`)
	}
}

export function getAuth(auth: string): IAuth {
	let decodedAuth = decode(auth.split(" ")[1]).split(":")

	return {
		username: decodedAuth[0],
		password: decodedAuth[1]
	}
}
