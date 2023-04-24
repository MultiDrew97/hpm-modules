"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var errors_1 = require("./errors");
var constants_1 = require("./constants");
/**
 * A class that contains individual timer logic
 */
var Timer = /** @class */ (function () {
    /**
     * Create a new Timer object using the provided config
     * @param config The configuration to use for the timer
     */
    function Timer(config) {
        if (!config)
            return;
        this.TimerConfig = config;
        // this.save()
    }
    Object.defineProperty(Timer.prototype, "TimerName", {
        /**
         * The name for the Timer
         * @constructor
         */
        get: function () {
            return this.TimerConfig ? this.TimerConfig.name : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "TimerConfig", {
        get: function () {
            return this._config;
        },
        set: function (newConfig) {
            this._config = newConfig;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Start the timer
     */
    Timer.prototype.start = function () {
        var _this = this;
        if (!this.TimerConfig) {
            console.log("No config present. Throwing timer error");
            throw new errors_1.TimerError('No config present');
        }
        if (!this.TimerConfig.fn)
            throw new errors_1.TimerError('No function present in config');
        switch (this.TimerConfig.type) {
            case "interval":
                this._timerID = setInterval(function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    ((_a = _this.TimerConfig) === null || _a === void 0 ? void 0 : _a.fn).apply(args[0], args);
                }, this.TimerConfig.time, this.TimerConfig.args);
                break;
            case "timeout":
                this._timerID = setTimeout(this.TimerConfig.fn, this.TimerConfig.time, this.TimerConfig.args);
                break;
            /*case "immediate":
                this._timerID = setImmediate(<(...args: any[]) => void>this._config.fn!, this._config.args)
                break*/
            default:
                throw new errors_1.TimerError("".concat(this.TimerConfig.type, " is not a valid timer type."));
        }
    };
    /**
     * Stop the timer
     */
    Timer.prototype.stop = function () {
        if (!this._timerID || !this.TimerConfig)
            throw new errors_1.TimerError("Timer was not started");
        switch (this.TimerConfig.type) {
            case "interval":
                clearInterval(this._timerID);
                break;
            case "timeout":
                clearTimeout(this._timerID);
                break;
            /*case "immediate":
                clearImmediate(<NodeJS.Immediate>this._timerID)
                break*/
            default:
                throw new errors_1.TimerError("".concat(this.TimerConfig.type, " is not a valid timer type."));
        }
    };
    Timer.prototype.save = function () {
        var _a;
        console.debug("Saving %s timer", (_a = this.TimerConfig) === null || _a === void 0 ? void 0 : _a.name);
        if (!this.TimerConfig)
            return;
        var temp = this.TimerConfig;
        temp.fn = temp.fn.toString();
        console.debug(JSON.stringify(temp, function (key, value) {
            console.debug(key);
            console.debug(value);
            console.debug(typeof value);
            return;
        }));
        sessionStorage.setItem("".concat((constants_1.TIMER_KEY), ".").concat(this.TimerConfig.name), JSON.stringify(temp));
        console.debug("%s timer has been saved...", this.TimerConfig.name);
    };
    Timer.prototype.load = function (name) {
        var _a;
        var session = sessionStorage.getItem(name);
        if (!session)
            throw new errors_1.TimerError("Timer ".concat(name, " doesn't exist"));
        this.TimerConfig = JSON.parse(session);
        if (!this.TimerConfig)
            return;
        if (typeof this.TimerConfig.fn === 'string') {
            this.TimerConfig.fn = Function(this.TimerConfig.fn);
        }
        (_a = this.TimerConfig) === null || _a === void 0 ? void 0 : _a.fn();
    };
    return Timer;
}());
exports.Timer = Timer;
