/// <reference types="node" />
import { IncomingHttpHeaders } from "http";
import { IAuth } from "@herbivore/core/utils/interfaces";
export declare function validateHeaders(headers: IncomingHttpHeaders, authRegex: RegExp, apiAuth: IAuth): void;
export declare function validateQueryID(...ids: any): void;
export declare function getAuth(auth: string): IAuth;
