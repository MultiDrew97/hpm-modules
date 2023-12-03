"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversion_1 = require("../../lib/utils/conversion");
describe('Conversions', function () {
    let value = 2;
    it('should convert the value from seconds to ms', function () {
        let expected = conversion_1.TimeConversions.MS_IN_SECOND;
        expect(conversion_1.Convert.fromSeconds(value)).toEqual(value * expected);
    });
    it('should convert the value from minutes to ms', function () {
        let expected = conversion_1.TimeConversions.SECONDS_IN_MINUTE * conversion_1.TimeConversions.MS_IN_SECOND;
        expect(conversion_1.Convert.fromMinutes(value)).toEqual(value * expected);
    });
    it('should convert the value from hours to ms', function () {
        let expected = conversion_1.TimeConversions.MINUTES_IN_HOUR *
            conversion_1.TimeConversions.SECONDS_IN_MINUTE *
            conversion_1.TimeConversions.MS_IN_SECOND;
        expect(conversion_1.Convert.fromHours(value)).toEqual(value * expected);
    });
    it('should convert the value from days to ms', function () {
        let expected = conversion_1.TimeConversions.HOURS_IN_DAY *
            conversion_1.TimeConversions.MINUTES_IN_HOUR *
            conversion_1.TimeConversions.SECONDS_IN_MINUTE *
            conversion_1.TimeConversions.MS_IN_SECOND;
        expect(conversion_1.Convert.fromDays(value)).toEqual(value * expected);
    });
    it('should convert the value from years to ms', function () {
        let expected = conversion_1.TimeConversions.DAYS_IN_YEAR *
            conversion_1.TimeConversions.HOURS_IN_DAY *
            conversion_1.TimeConversions.MINUTES_IN_HOUR *
            conversion_1.TimeConversions.SECONDS_IN_MINUTE *
            conversion_1.TimeConversions.MS_IN_SECOND;
        expect(conversion_1.Convert.fromYears(value)).toEqual(value * expected);
    });
});
