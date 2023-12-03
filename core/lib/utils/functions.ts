import { Types, isObjectIdOrHexString } from 'mongoose'
import { Md5 } from 'ts-md5'
import { ArgumentError } from './errors'

export { Convert } from './conversion'
export { encode, decode } from 'js-base64'
/**
 * Returns the index of the provided value in the provided array
 * @param array The array to search through
 * @param value The value to search for
 * @param path The JSON path to the value
 */
export function indexOf(array: any[], value: any, path: string = ""): number {
	return array.findIndex(item => {
		switch (typeof item) {
			case "string":
			case "number":
				return item === value
			default:
				return item[path] === value
		}
	})
}

/**
 * Encrypt a given string value using the provided salt value
 * @param plainText The plain text to encrypt
 * @param salt The salt for the encryption, any
 */
export function encrypt(plainText: string, salt?: string): string {
	// FIXME: Replace encryption with sha256
	return Md5.hashStr(`${plainText}${salt}`)
}

export function toObjectId(value?: string): Types.ObjectId {
	if (!value || !isObjectIdOrHexString(value))
		throw new ArgumentError(
			`Provided ID '${value}' is not a valid ObjectID`
		)

	return new Types.ObjectId(value)
}
