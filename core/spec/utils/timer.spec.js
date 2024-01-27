"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
var createSpy = jasmine.createSpy;
let timeoutConfig = {
    name: 'Test',
    type: 'timeout',
    fn: timeoutTest,
    time: utils_1.Convert.fromSeconds(1),
    args: [],
};
let intervalConfig = {
    name: 'Test',
    type: 'interval',
    fn: intervalTest,
    time: utils_1.Convert.fromSeconds(1),
    args: [],
};
let validTimer;
let invalidTimer;
let interval;
let timeout;
let intervalSpy = createSpy('Interval Function', intervalTest);
let timeoutSpy = createSpy('Timeout Function', timeoutTest);
describe('Timers', function () {
    beforeEach(() => {
        if (validTimer?.isRunning)
            validTimer.stop();
        validTimer = new utils_1.Timer(timeoutConfig);
        invalidTimer = new utils_1.Timer();
    });
    it('should properly start a timer', function () {
        expect(() => {
            validTimer.start();
        }).not.toThrowError(utils_1.TimerError, 'No config present');
        expect(() => {
            invalidTimer.start();
        }).toThrowError('No config present');
    });
    it('should stop timer with no errors', function () {
        validTimer.start();
        expect(() => {
            validTimer.stop();
        }).not.toThrowError(utils_1.TimerError, 'Timer not started');
        expect(() => {
            validTimer.stop();
        }).toThrowError('Timer not started');
    });
});
/*describe('Timer functions', function () {
    beforeAll(() => {
        interval = new Timer(intervalConfig)
        timeout = new Timer(timeoutConfig)
    })

    it('should call the timer function', function () {
        interval.start()
        timeout.start()
        expect(intervalSpy).toHaveBeenCalled()
        expect(timeoutSpy).toHaveBeenCalled()
    });
});*/
function intervalTest() {
    console.log('Interval executed');
}
function timeoutTest() {
    console.log('Timeout executed');
}
