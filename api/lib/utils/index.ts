export * from "./utils"

export const API_PATHS = {
	passwords: "/api/passwords",
	login: "/api/login",
	checkPass: "/api/login/:userID",
	users: "/api/users",
	userPass: "/api/users/:userID",
	config: "/api/users/:userID/config"
}
