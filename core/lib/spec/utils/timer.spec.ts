import {Timer, ITimerConfig, Convert, TimerError} from "../../utils"

describe('Timers', function () {
	let timeoutConfig: ITimerConfig = {
		name: "Test",
		type: "timeout",
		fn: () => {console.log("Timer Executed")},
		time: Convert.fromSeconds(1),
		args: []
	}

	let intervalConfig: ITimerConfig = {
		name: "Test",
		type: "interval",
		fn: () => {console.log("Timer Executed")},
		time: Convert.fromSeconds(1),
		args: []
	}

	it('should throw an error for not having a config', function () {
		let test: Timer = new Timer()
		expect(test.start).toThrowError(TimerError, "No config present")
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
