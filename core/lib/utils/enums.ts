export enum ModelNames {
	User = 'User',
	Entries = 'Entry',
}

export enum CollectionNames {
	User = 'Users',
	Entries = 'Entries',
}

export enum ErrorNames {
	NotFound = 'NotFoundError',
	Creation = 'CreationError',
	Update = 'UpdateError',
	Remove = 'RemoveError',
	NotImplemented = 'NotYetImplemented',
	Argument = 'ArgumentError',
	Timer = 'TimerError',
	Authentication = 'AuthenticationError',
	Authorization = 'AuthorizationError',
	Login = 'LoginError',
	Totp = 'TotpError',
	Entry = 'EntryError',
	User = 'UserError',
	Database = 'DatabaseError',
	Connection = 'ConnectionError',
}