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
	const logMessage: string = `${HEADING}${TAGS.log} ${date ? getDate() : ""} ${message}`
	console.log(`%s`, logMessage, ...data)
}

export function info(date?: boolean, message?: any, ...data: any[]) {
	const logMessage = `${HEADING}${TAGS.log} ${date ? getDate() : ""} ${message}`
	console.info(`%s`, logMessage, ...data)
}

export function warn(date?: boolean, message?: any, ...data: any[]) {
	const logMessage = `${HEADING}${TAGS.log} ${date ? getDate() : ""} ${message}`
	console.warn(`%s`, logMessage, ...data)
}

export function error(date?: boolean, message?: any, ...data: any[]) {
	const logMessage = `${HEADING}${TAGS.log} ${date ? getDate() : ""} ${message}`
	console.error(`%s`, logMessage, ...data)
}

export function debug(date?: boolean, message?: any, ...data: any[]) {
	const logMessage = `${HEADING}${TAGS.log} ${date ? getDate() : ""} ${message}`
	console.debug(`%s`, logMessage, ...data)
}

export function trace(date?: boolean, message?: any, ...data: any[]) {
	const logMessage = `${HEADING}${TAGS.log} ${date ? getDate() : "|"} ${message}`
	console.trace(`%s`, logMessage, ...data)
}

function getDate() {
	let date = (new Date(Date.now()))
	return `${date.toDateString()}`
}
