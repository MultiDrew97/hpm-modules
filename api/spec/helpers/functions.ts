// import { User } from '../../lib/database'
// import { IAuth, IUser } from '@herbivore/core/utils/interfaces'

// export const getPassEntry = async (userID?: string) => {
// 	try {
// 		let user: IUser | null = await User.findById(userID)

// 		if (!user) throw new Error()

// 		return user.entries
// 	} catch {
// 		return undefined
// 	}
// }

// export const getUser = async (
// 	username?: string
// ): Promise<IUser[] | undefined> => {
// 	let users = await (username ? User.find({ username }) : User.find())
// 	return users.length > 0 ? users : undefined
// }

// export const login = async (auth: IAuth) => {
// 	try {
// 		await User.login(auth)
// 		return true
// 	} catch (e: any) {
// 		return false
// 	}
// }

// export const checkPassword = async (id: string, password: string) => {
// 	try {
// 		return await User.checkPassword(id, password)
// 	} catch (e: any) {
// 		throw e
// 	}
// }
