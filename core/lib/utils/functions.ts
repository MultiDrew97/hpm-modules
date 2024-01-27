import { Md5 } from 'ts-md5'

/**
 * Encrypt a given string value using the provided salt value
 * @param plainText The plain text to encrypt
 * @param salt The salt for the encryption, any
 */
export function encrypt(plainText: string, salt?: string): string {
	// FIXME: Replace encryption with sha256
	return Md5.hashStr(`${plainText}${salt}`)
}
