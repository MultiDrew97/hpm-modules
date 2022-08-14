class CustomError extends Error {
	private readonly reason?: Error
	constructor(message?: string, reason?: Error) {
		super(message);
		this.reason = reason;
	}
}

export class AuthorizationError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class DatabaseError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class ConnectionError extends DatabaseError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class LoginError extends AuthorizationError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class ArgumentError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class TimerError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(message, reason);
	}
}

export class AuthenticationError extends CustomError {}

export class PropertyError extends CustomError {}

export class NotYetImplementedError extends CustomError {
	constructor(message?: string) {
		super(message ?? 'Property has not yet been implemented');
	}
}
