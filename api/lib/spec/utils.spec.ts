import {getAuth} from "../utils"
import {IncomingHttpHeaders} from "http";
import {verifyHeaders, verifyIDs} from "./helpers/functions";
import {encode} from "@herbivore/core/utils"
import {IAuth} from "@herbivore/core/utils/interfaces";
import {Types} from "mongoose";

let apiAuth: IAuth = {
	username: "username",
	password: "password"
}

let authRegex: RegExp = /Basic .+/

let validHeader: IncomingHttpHeaders = {
	authorization: `Basic ${encode(`${apiAuth.username}:${apiAuth.password}`)}`
}
let invalidHeader: IncomingHttpHeaders = {}
let validIDs = [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()]
let invalidIDs = ["123443", 123]

describe('General Utility Functions', function () {
	it('should correctly decode and parse the auth details from the header', function () {
		expect(getAuth(validHeader.authorization!)).toEqual(apiAuth)
	});

	it('should verify proper headers are present', function () {
		expect(verifyHeaders(validHeader, authRegex, apiAuth)).toBeTrue()
		expect(verifyHeaders(invalidHeader, authRegex, apiAuth)).toBeFalse()
	});

	it('should correctly validate the query IDs', function () {
		expect(verifyIDs(...validIDs)).toBeTrue()
		expect(verifyIDs(...invalidIDs)).toBeFalse()
	});
});
