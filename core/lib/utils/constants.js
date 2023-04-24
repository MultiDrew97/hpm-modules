"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = exports.TIMER_KEY = exports.TimeConversions = void 0;
var conversion_1 = require("./conversion");
Object.defineProperty(exports, "TimeConversions", { enumerable: true, get: function () { return conversion_1.TimeConversions; } });
/**
 * The key used to store and retrieve timers
 */
exports.TIMER_KEY = "timer";
/**
 * The default user config to use for any new users
 */
exports.DEFAULT_CONFIG = {
    syncTime: 2
};
