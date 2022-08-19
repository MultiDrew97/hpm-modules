import { ConnectOptions, Document } from "mongoose";
import { SameSite, TimerType } from ".";

/**
 * The base class for any database entry
 */
export declare interface IDbEntry {
	/**
	 * ID of the current database entry
	 */
	id?: string;

	/**
	 * Name of site/person
	 */
	name: string;
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
	desiredPage: string;

	/**
	 * Options for the connection
	 */
	options: ConnectOptions;
}

/**
 * Connection options for a database connection
 * @deprecated Please use the ConnectOptions interface from
 * @see ConnectOptions
 */
export declare interface IConnectOptions extends ConnectOptions {
	useNewUrlParser: boolean;
	useUnifiedTopology: boolean;
}

/**
 * The user data for a specific user
 */
export declare interface IUser extends IDbEntry {
	/**
	 * The email address for the user
	 */
	email: string;
	/**
	 * IDs/Password entries for the given user
	 */
	entries: (IPassEntry | string)[];
	/**
	 * The settings used for the logged-in user
	 */
	config: IUserConfig;

	/**
	 * The login info for the user
	 */
	login: IAuth
}

/**
 * A password entry for a user
 */
export declare interface IPassEntry extends IDbEntry {
	/**
	 * The sites that the password are used for
	 */
	sites: string[];

	/**
	 * The login for the sites
	 */
	login: IAuth;

	/**
	 * Previous password history when updating passwords
	 */
	passwordHistory: string[];
}

/**
 * Used for storing cookie configurations
 */
export declare interface ICookie {
	/**
	 * The name of the cookie in the cookie section
	 */
	name: string;

	/**
	 * The different options for the cookie
	 */
	options: ICookieOptions;
}

export declare interface ICookieOptions {
	/**
	 * The path to store the cookie
	 */
	path?: string;

	/**
	 * The domain of the site the cookie is for
	 */
	domain?: string;

	/**
	 * When the cookie is meant to expire
	 */
	expires?: number;

	/**
	 * Should the cookie be secure
	 */
	secure?: boolean;

	/**
	 * How strict is the cookie
	 */
	sameSite?: SameSite;
}

/**
 * Used for storing credential data
 */
export declare interface IAuth {
	/**
	 * The username
	 */
	username: string;

	/**
	 * The password
	 */
	password: string;

	/**
	 * The salt for encryption
	 */
	salt?: string;
}

/**
 * The configuration to use per user
 */
export declare interface IUserConfig {
	/**
	 * The number of minutes to wait before sync the passwords on the site
	 */
	syncTime?: number;
}

/**
 * Default behaviour of a dialog box
 */
export declare interface IDialog {
	close(value: any): void;
}

export declare interface ITimerConfig {
	/**
	 * The name of the timer
	 */
	name: string

	/**
	 * The function that the timer will be executing
	 */
	fn: TimerHandler | Function

	/**
	 * How long will the timer take to execute
	 */
	time?: number

	/**
	 * What kind of timer is it
	 */
	type: TimerType

	/**
	 * Any arguments that are to be passed to the function
	 */
	args: any[]
}
