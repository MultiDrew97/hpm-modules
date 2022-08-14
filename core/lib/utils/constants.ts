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
