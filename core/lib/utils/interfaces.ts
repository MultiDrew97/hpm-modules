import { ConnectOptions, Document } from "mongoose";
import { SameSite, TimerType } from ".";

/**
 * The base class for any database entry
 */
export declare interface IDbEntry extends Document {
	/**
	 * ID of the current database entry
	 */
	_id: string;
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
	 * Login credentials for database connection
	 */
	login: IAuth;
	/**
	 * The desired page to connect to
	 */
	desiredPage: string;
	/**
	 * Options for the connection
	 */
	options: IConnectOptions;
}
/**
 * Connection options for a database connection
 */
export declare interface IConnectOptions extends ConnectOptions {
	useNewUrlParser: boolean;
	useUnifiedTopology: boolean;
}
/**
 * The user data for a specific user
 */
export declare interface IUser extends IDbEntry, IAuth {
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
	options: {
		path?: string;
		domain?: string;
		expires?: number;
		secure?: boolean;
		sameSite?: SameSite;
	};
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
	name: string
	fn: TimerHandler | Function
	time?: number
	type: TimerType
	args: any[]
}
