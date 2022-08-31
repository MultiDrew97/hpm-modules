export const HEADING = "[HPM]"
export const TAGS = {
	log: "[LOG]",
	info: "[INFO]",
	warn: "[WARN]",
	error: "[ERROR]",
	debug: "[DEBUG]",
	trace: "[TRACE]"
}

export function log(message?: any, date?: boolean, ...data: any[]) {
	console.log(`%s`, prepMessage(TAGS.log, message, date), ...data)
}

export function info(message?: any, date?: boolean, ...data: any[]) {
	console.info(`%s`, prepMessage(TAGS.info, message, date), ...data)
}

export function warn(message?: any, date?: boolean, ...data: any[]) {
	console.warn(`%s`, prepMessage(TAGS.warn, message, date), ...data)
}

export function error(message?: any, date?: boolean, ...data: any[]) {
	console.error(`%s`, prepMessage(TAGS.error, message, date), ...data)
}

export function debug(message?: any, date?: boolean, ...data: any[]) {
	console.debug(`%s`, prepMessage(TAGS.debug, message, date), ...data)
}

export function trace(message?: any, date?: boolean, ...data: any[]) {
	console.trace(`%s`, prepMessage(TAGS.trace, message, date), ...data)
}

function getDate() {
	let date = (new Date(Date.now()))
	return `(${date.toDateString()}) `
}

function prepMessage(tag: string, message: string, date?: boolean) {
	return `${date ? getDate() : ""}${HEADING}${tag} ${message}`
}
