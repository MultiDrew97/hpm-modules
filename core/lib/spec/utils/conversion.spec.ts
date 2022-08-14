import {Convert, TimeConversions} from "../../utils/conversion"

describe('Conversions', function () {
	let value: number = 2
	it('should convert the value from seconds to ms', function () {
		let expected: number = TimeConversions.MS_IN_SECOND
		expect(Convert.fromSeconds(value)).toEqual(value * expected)
	});

	it('should convert the value from minutes to ms', function () {
		let expected: number = TimeConversions.SECONDS_IN_MINUTE * TimeConversions.MS_IN_SECOND
		expect(Convert.fromMinutes(value)).toEqual(value * expected)
	});

	it('should convert the value from hours to ms', function () {
		let expected: number = TimeConversions.MINUTES_IN_HOUR *
			TimeConversions.SECONDS_IN_MINUTE * TimeConversions.MS_IN_SECOND
		expect(Convert.fromHours(value)).toEqual(value * expected)
	});

	it('should convert the value from days to ms', function () {
		let expected: number = TimeConversions.HOURS_IN_DAY * TimeConversions.MINUTES_IN_HOUR *
			TimeConversions.SECONDS_IN_MINUTE * TimeConversions.MS_IN_SECOND
		expect(Convert.fromDays(value)).toEqual(value * expected)
	});

	it('should convert the value from years to ms', function () {
		let expected: number = TimeConversions.DAYS_IN_YEAR *
			TimeConversions.HOURS_IN_DAY * TimeConversions.MINUTES_IN_HOUR *
			TimeConversions.SECONDS_IN_MINUTE * TimeConversions.MS_IN_SECOND
		expect(Convert.fromYears(value)).toEqual(value * expected)
	});
});
