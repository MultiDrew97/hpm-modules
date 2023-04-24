import {TimerError} from "./errors"
import {TIMER_KEY} from "./constants"
import {ITimerConfig} from "./interfaces";

export type TimerType = "interval" | "timeout"

/**
 * A class that contains individual timer logic
 */
export class Timer {
	/**
	 * The ID for the timer for being able to stop the timer
	 * @private
	 */
	private _timerID?: number | NodeJS.Immediate | NodeJS.Timer

	/**
	 * Configuration for the timer for starting after being stopped
	 * @private
	 */
	private _config?: ITimerConfig

	private _running: boolean = false

	/**
	 * The name for the Timer
	 * @constructor
	 */
	get TimerName() {
		if (!this.TimerConfig)
			throw new TimerError("No config present")

		return this.TimerConfig.name
	}

	get TimerConfig(): ITimerConfig | undefined {
		return this._config
	}

	set TimerConfig(newConfig: ITimerConfig | undefined) {
		this._config = newConfig
	}

	get isRunning(): boolean {
		return this._running
	}

	/**
	 * Create a new Timer object using the provided config
	 * @param config The configuration to use for the timer
	 */
	constructor(config?: ITimerConfig) {
		if (!config)
			return

		this.TimerConfig = config
		// this.save()
	}

	/**
	 * Start the timer
	 */
	start(): void {
		if (!this.TimerConfig)
			throw new TimerError('No config present')

		if (!this.TimerConfig.fn)
			throw new TimerError('No function present in config to start')

		if (this.isRunning)
			throw new TimerError("Timer has already been started")

		switch(this.TimerConfig.type) {
			case "interval":
				this._timerID = setInterval((<Function>this.TimerConfig?.fn), this.TimerConfig.time, ...this.TimerConfig.args)
				break
			case "timeout":
				this._timerID = setTimeout(this.TimerConfig.fn, this.TimerConfig.time, this.TimerConfig.args)
				break
			default:
				throw new TimerError(`${this.TimerConfig.type} is not a valid timer type.`)
		}

		this._running = true
	}

	/**
	 * Stop the timer
	 */
	stop(): void {
		if (!this._timerID || !this.TimerConfig || !this.isRunning)
			throw new TimerError("No timer was started")

		switch (this.TimerConfig.type) {
			case "interval":
				clearInterval(<number>this._timerID)
				break
			case "timeout":
				clearTimeout(<number>this._timerID)
				break
			/*case "immediate":
				clearImmediate(<NodeJS.Immediate>this._timerID)
				break*/
			default:
				throw new TimerError(`${this.TimerConfig.type} is not a valid timer type.`)
		}

		this._running = false
	}

	save(): void {
		console.debug("Saving %s timer", this.TimerConfig?.name)
		if (!this.TimerConfig)
			return

		let temp: ITimerConfig = this.TimerConfig
		temp.fn = temp.fn.toString()
		console.debug(JSON.stringify(temp, (key: string, value: any) => {
			console.debug(key)
			console.debug(value)

			console.debug(typeof value)
			return
		}))
		sessionStorage.setItem(`${(TIMER_KEY)}.${this.TimerConfig.name}`, JSON.stringify(temp))
		console.debug("%s timer has been saved...", this.TimerConfig.name)
	}

	load(name: string): void {
		const session = sessionStorage.getItem(name)

		if (!session)
			throw new TimerError(`Timer ${name} doesn't exist`)

		this.TimerConfig = JSON.parse(session)

		if (!this.TimerConfig)
			return

		if (typeof this.TimerConfig.fn === 'string') {
			this.TimerConfig.fn = Function(<string>this.TimerConfig.fn)
		}

		this.start()
	}
}
