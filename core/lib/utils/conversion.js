"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = exports.TimeConversions = void 0;
var TimeConversions;
(function (TimeConversions) {
    /**
     * The number of ms in 1 second
     */
    TimeConversions[TimeConversions["MS_IN_SECOND"] = 1000] = "MS_IN_SECOND";
    /**
     * The number of secs in 1 minute
     */
    TimeConversions[TimeConversions["SECONDS_IN_MINUTE"] = 60] = "SECONDS_IN_MINUTE";
    /**
     * The number of mins in 1 hour
     */
    TimeConversions[TimeConversions["MINUTES_IN_HOUR"] = 60] = "MINUTES_IN_HOUR";
    /**
     * The number of hrs in 1 day
     */
    TimeConversions[TimeConversions["HOURS_IN_DAY"] = 24] = "HOURS_IN_DAY";
    /**
     * The number of dys in 1 year
     */
    TimeConversions[TimeConversions["DAYS_IN_YEAR"] = 365] = "DAYS_IN_YEAR";
})(TimeConversions = exports.TimeConversions || (exports.TimeConversions = {}));
/*
 * Holds all conversion related functions
 */
var Convert;
(function (Convert) {
    /**
     * Converts the number from seconds to ms
     * @param seconds The number of seconds to convert to ms
     */
    function fromSeconds(seconds) {
        return seconds * TimeConversions.MS_IN_SECOND;
    }
    Convert.fromSeconds = fromSeconds;
    /**
     * Converts the number from minutes to ms
     * @param minutes The number of minutes to convert to ms
     */
    function fromMinutes(minutes) {
        return fromSeconds(minutes) * TimeConversions.SECONDS_IN_MINUTE;
    }
    Convert.fromMinutes = fromMinutes;
    /**
     * Converts the number from hours to ms
     * @param hours The number of days to convert to ms
     */
    function fromHours(hours) {
        return fromMinutes(hours) * TimeConversions.MINUTES_IN_HOUR;
    }
    Convert.fromHours = fromHours;
    /**
     * Converts the number from days to ms
     * @param days The number of days to convert to ms
     */
    function fromDays(days) {
        return fromHours(days) * TimeConversions.HOURS_IN_DAY;
    }
    Convert.fromDays = fromDays;
    /**
     * Converts the number from years to ms
     * @param years The number of years to convert to ms
     */
    function fromYears(years) {
        return fromDays(years) * TimeConversions.DAYS_IN_YEAR;
    }
    Convert.fromYears = fromYears;
})(Convert = exports.Convert || (exports.Convert = {}));
