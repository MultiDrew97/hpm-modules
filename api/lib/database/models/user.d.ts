import { IAuth, IUser, IUserConfig } from "@herbivore/core/utils/interfaces";
import { Model } from "mongoose";
interface IUserDoc extends IUser {
}
interface IUserModel extends Model<IUserDoc> {
    login(auth: IAuth): Promise<boolean>;
    checkPassword(id: string, password: string): Promise<boolean>;
    isUniqueUsername(username: string): Promise<boolean>;
    getSalt(id: string): Promise<string>;
    addPassword(userID: string, entryID: string): void;
    removePassword(userID: string, entryID: string): Promise<boolean>;
    updatePassword(userID: string, newPassword: string): Promise<any>;
    getUserConfig(userID: string): Promise<IUserConfig>;
}
export declare const User: IUserModel;
export {};
