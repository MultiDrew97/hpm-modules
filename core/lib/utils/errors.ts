import { ErrorNames } from './enums'

export class CustomError extends Error {
	constructor(name: string, message?: string, cause?: any) {
		super(message)
		this.name = name
		this.cause = cause
	}
}

export class AuthorizationError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(ErrorNames.Authorization, message, reason)
	}
}

export class DatabaseError extends CustomError {
	constructor(name: string = ErrorNames.Database, message?: string, reason?: Error) {
		super(name, message, reason)
	}
}

export class ConnectionError extends DatabaseError {
	constructor(message?: string, reason?: Error) {
		super(ErrorNames.Connection, message, reason)
	}
}

export class ArgumentError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(ErrorNames.Argument, message, reason)
	}
}

export class AuthenticationError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(ErrorNames.Authentication, message, reason)
	}
}

export class PropertyError extends CustomError {
	constructor(message?: string, reason?: Error) {
		super(ErrorNames.Property, message, reason)
	}
}

export class NotYetImplementedError extends CustomError {
	constructor(message?: string) {
		super(ErrorNames.NotImplemented, message ?? 'Property has not yet been implemented')
	}
}

export class NotFoundError extends CustomError {
	constructor(message?: string) {
		super(ErrorNames.NotFound, message)
	}
}

export class UpdateError extends CustomError {
	constructor(message?: string) {
		super(ErrorNames.Update, message)
	}
}

export class RemoveError extends CustomError {
	constructor(message?: string) {
		super(ErrorNames.Remove, message)
	}
}

export class CreationError extends CustomError {
	constructor(message?: string) {
		super(ErrorNames.Creation, message)
	}
}
