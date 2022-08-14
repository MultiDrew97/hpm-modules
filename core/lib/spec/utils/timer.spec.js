"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
describe('Timers', function () {
    var timeoutConfig = {
        name: "Test",
        type: "timeout",
        fn: function () { console.log("Timer Executed"); },
        time: utils_1.Convert.fromSeconds(1),
        args: []
    };
    var intervalConfig = {
        name: "Test",
        type: "interval",
        fn: function () { console.log("Timer Executed"); },
        time: utils_1.Convert.fromSeconds(1),
        args: []
    };
    it('should throw an error for not having a config', function () {
        var test = new utils_1.Timer();
        expect(test.start).toThrowError(utils_1.TimerError, "No config present");
    });
    /*it('should start timer with no errors', function () {
        let testTimer: Timer = new Timer(timeoutConfig)
        expect(testTimer.start).not.toThrowError(TimerError, "No config present")
    });

    it('should stop timer with no errors', function() {
        let testTimer: Timer = new Timer(intervalConfig)
        testTimer.start()

        expect(testTimer.stop).not.toThrowError(TimerError, "Timer was not started")
    })*/
});
