import {IUserConfig} from "./interfaces";

export {TimeConversions} from "./conversion"

/**
 * The key used to store and retrieve timers
 */
export const TIMER_KEY: string = "timer"

/**
 * The default user config to use for any new users
 */
export const DEFAULT_CONFIG: IUserConfig = {
	syncTime: 2
}

// MAYBE: Create a logging module to streamline logging
// TODO: Figure out a better name for this
/**
 * The name of the App to use
 */
export const LOG_NAME = "[HPM]"

export const LOG_HEADS = {
	log: (module?: string) => `${LOG_NAME}${module ? `[${module}]` : ""}[LOG]`,
	error: (module?: string) => `${LOG_NAME}${module ? `[${module}]` : ""}[ERROR]`,
	debug: (module?: string) => `${LOG_NAME}${module ? `[${module}]` : ""}[DEBUG]`,
	info: (module?: string) => `${LOG_NAME}${module ? `[${module}]` : ""}[INFO]`
}
