import { IPassEntry } from "@herbivore/core/utils/interfaces";
import { Model } from "mongoose";
interface IPassEntryDoc extends IPassEntry {
    updatePassword(newPassword: string): Promise<boolean>;
}
interface IPassEntryModel extends Model<IPassEntryDoc> {
    addEntry(userID: string, newEntry: IPassEntry): Promise<void>;
}
export declare const PasswordEntry: IPassEntryModel;
export {};
