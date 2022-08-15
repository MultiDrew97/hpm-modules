import { IAuth, IUser } from "@herbivore/core/utils/interfaces";
import { IncomingHttpHeaders } from "http";
export declare const getPassEntry: (userID?: string) => Promise<(string | import("@herbivore/core/utils/interfaces").IPassEntry)[] | undefined>;
export declare const getUser: (username?: string) => Promise<IUser[] | undefined>;
export declare const login: (auth: IAuth) => Promise<boolean>;
export declare const checkPassword: (id: string, password: string) => Promise<boolean>;
export declare const verifyHeaders: (headers: IncomingHttpHeaders, regex: RegExp, auth: IAuth) => boolean;
export declare const verifyIDs: (...ids: any) => boolean;
