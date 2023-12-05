class CustomError extends Error {
	constructor(message?: string, cause?: Error, name?: string) {
		super(message)
		this.cause = cause

		if (name) this.name = name
	}
}

export class AuthorizationError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'AuthorizationError'
	}
}

export class DatabaseError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'DatabaseError'
	}
}

export class ConnectionError extends DatabaseError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'ConnectionError'
	}
}

export class LoginError extends AuthorizationError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'LoginError'
	}
}

export class ArgumentError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'ArgumentError'
	}
}

export class TimerError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'TimerError'
	}
}

export class AuthenticationError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'AuthenticationError'
	}
}

export class PropertyError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'PropertyError'
	}
}

export class NotYetImplementedError extends CustomError {
	constructor(message?: string) {
		super(message ?? 'Property has not yet been implemented')

		this.name = 'NotYetImplementedError'
	}
}

export class TotpError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason)

		this.name = 'TotpError'
	}
}
