import { ConnectOptions } from 'mongoose'

/**
 * The base class for any database entry
 */
export interface IDbEntry {
	/**
	 * ID of the current database entry
	 */
	_id?: any

	/**
	 * Name of entry/person
	 */
	name: string
}

/**
 * Used for storing credential data
 */
export declare interface IAuth {
	/**
	 * The username
	 */
	username: string

	/**
	 * The password
	 */
	password?: string

	/**
	 * The salt for encryption
	 */
	salt?: string
}

/**
 * Database configuration template
 */
export declare interface IDbConfig {
	/**
	 * The uri to use for the connection
	 */
	uri: string | URL

	/**
	 * The desired page to connect to
	 */
	desiredPage: string

	/**
	 * Options for the connection
	 */
	options: ConnectOptions
}

/**
 * Connection options for a database connection
 * @deprecated Please use the ConnectOptions interface from
 * @see ConnectOptions
 */
export declare interface IConnectOptions extends ConnectOptions {
	useNewUrlParser: boolean
	useUnifiedTopology: boolean
}
