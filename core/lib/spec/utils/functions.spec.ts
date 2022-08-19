import {encode, decode, encrypt, indexOf} from "../../utils";

describe('Functions', function () {
	const value: string = "value"
	describe('Encode', function () {
		it('should encode a value for url encoding consistently', function () {
			expect(encode(value)).toEqual(encode(value))
		});

		it('should decode a value ', function () {
			let encoded: string = encode(value)

			expect(decode(encoded)).toEqual(value)
		});
	});

	describe('Encrypt', function () {
		it('should encrypt a given value', function () {
			let salt: string = "salt"
			let encrypted: string = "edcfc93e3a3010a74fdcf1e8ceedfeab"
			
			expect(encrypt(value, salt)).toEqual(encrypted)
		});
	});

	describe('Indexes', function () {
		it('should retrieve a consistent index', function () {
			let arr = ["test", "value", "another value"]
			let desired: string = "value"
			let path: string = ""

			expect(indexOf(arr, desired, path)).toEqual(1)
		});
	});
});

