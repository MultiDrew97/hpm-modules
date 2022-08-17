import {Timer, ITimerConfig, Convert, TimerError} from "../../utils"
import createSpy = jasmine.createSpy;

let timeoutConfig: ITimerConfig = {
	name: "Test",
	type: "timeout",
	fn: timeoutTest,
	time: Convert.fromSeconds(1),
	args: []
}

let intervalConfig: ITimerConfig = {
	name: "Test",
	type: "interval",
	fn: intervalTest,
	time: Convert.fromSeconds(1),
	args: []
}

let validTimer: Timer
let invalidTimer: Timer
let interval: Timer
let timeout: Timer

let intervalSpy = createSpy("Interval Function", intervalTest)
let timeoutSpy = createSpy("Timeout Function", timeoutTest)

describe('Timers', function () {
	beforeEach(() => {
		if (validTimer?.isRunning)
			validTimer.stop()

		validTimer = new Timer(timeoutConfig)
		invalidTimer = new Timer()
	})

	it('should properly start a timer', function () {
		expect(() => {
			validTimer.start()
		}).not.toThrowError(TimerError, "No config present")

		expect(() => {
			invalidTimer.start()
		}).toThrowError("No config present")
	});

	it('should stop timer with no errors', function() {
		validTimer.start()
		expect(() => {
			validTimer.stop()
		}).not.toThrowError(TimerError, "Timer not started")

		expect(() => {
			validTimer.stop()
		}).toThrowError("Timer not started")
	})
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
	console.log("Interval executed")
}

function timeoutTest() {
	console.log("Timeout executed")
}
