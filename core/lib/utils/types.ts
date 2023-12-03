import { ConnectOptions } from 'mongoose'

export type MongoConfig = {
	config?: ConnectOptions
	url?: string
}

export type TotpAlgorithm =
	| 'SHA-1'
	| 'SHA-224'
	| 'SHA-256'
	| 'SHA-384'
	| 'SHA-512'
	| 'SHA3-224'
	| 'SHA3-256'
	| 'SHA3-384'
	| 'SHA3-512'
