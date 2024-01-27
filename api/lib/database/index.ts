import { ArgumentError } from '@herbivore/core/utils/errors'
import { ConnectOptions, Types, isObjectIdOrHexString } from 'mongoose'

export { connection, connect } from 'mongoose'

export type MongoConfig = {
	config?: ConnectOptions
	url?: string
}

export function toObjectId(value?: string): Types.ObjectId {
	if (!value || !isObjectIdOrHexString(value))
		throw new ArgumentError(`Provided ID '${value}' is not a valid ObjectID`)

	return new Types.ObjectId(value)
}

/**
 * Handles opening and closing a database connection before attempting desired operations
 */
export function ManageConnection(_target: any, _methodName: any, desc: any) {
	const orig: Function = desc.value

	desc.value = async function (...args: any) {
		try {
			//set('strictQuery', true)
			if (!this.isConnected) await this.open()

			let rtn = orig && (await orig.call(this, ...args))

			return rtn
		} finally {
			await this.close()
		}
	}
}

/**
 * Handles applying the desired config for the MongoDB database connections
 * @param mdbConfig Desired mongodb config
 * @returns
 */
export function MongoConfig(mdbConfig?: MongoConfig): ClassDecorator {
	return function (target: any) {
		Object.defineProperty(target.prototype, 'url', {
			get: () => mdbConfig!.url,
		})

		Object.defineProperty(target.prototype, 'config', {
			get: () => mdbConfig!.config,
		})
	}
}
