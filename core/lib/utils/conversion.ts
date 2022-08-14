export enum TimeConversions {
	/**
	 * The number of ms in 1 second
	 */
	MS_IN_SECOND = 1000,
	/**
	 * The number of secs in 1 minute
	 */
	SECONDS_IN_MINUTE = 60,
	/**
	 * The number of mins in 1 hour
	 */
	MINUTES_IN_HOUR = 60,
	/**
	 * The number of hrs in 1 day
	 */
	HOURS_IN_DAY = 24,
	/**
	 * The number of dys in 1 year
	 */
	DAYS_IN_YEAR = 365
}

/*
 * Holds all conversion related functions
 */
export module Convert {
	/**
	 * Converts the number from seconds to ms
	 * @param seconds The number of seconds to convert to ms
	 */
	export function fromSeconds(seconds: number): number {
		return seconds * TimeConversions.MS_IN_SECOND
	}

	/**
	 * Converts the number from minutes to ms
	 * @param minutes The number of minutes to convert to ms
	 */
	export function fromMinutes(minutes: number): number {
		return fromSeconds(minutes) * TimeConversions.SECONDS_IN_MINUTE
	}

	/**
	 * Converts the number from hours to ms
	 * @param hours The number of days to convert to ms
	 */
	export function fromHours(hours: number): number {
		return fromMinutes(hours) * TimeConversions.MINUTES_IN_HOUR
	}

	/**
	 * Converts the number from days to ms
	 * @param days The number of days to convert to ms
	 */
	export function fromDays(days: number): number {
		return fromHours(days) * TimeConversions.HOURS_IN_DAY
	}

	/**
	 * Converts the number from years to ms
	 * @param years The number of years to convert to ms
	 */
	export function fromYears(years: number): number {
		return fromDays(years) * TimeConversions.DAYS_IN_YEAR
	}
}
