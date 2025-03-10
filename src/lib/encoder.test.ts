import { describe, it, expect } from 'vitest';
import { encodeToBASE64URL, decodeFromBASE64URL } from './encoder';

describe('encoder', () => {
	it('encodeToBASE64URL should encode an array of 81 numbers to a URL-friendly base64 string', () => {
		const numbers = Array(81)
			.fill(0)
			.map((_, i) => i % 10);
		const encoded = encodeToBASE64URL(numbers);
		console.log(encoded);
		expect(encoded).toBe("AxWam4U6o33oe3IxUDFZqbhTqjfeh7cjFQMVmpuFOqN96");
	});

	it('decodeFromBASE64URL should decode a URL-friendly base64 string back to an array of 81 numbers', () => {
		const numbers = Array(81)
			.fill(0)
			.map((_, i) => i % 10);
		const encoded = encodeToBASE64URL(numbers);
		const decoded = decodeFromBASE64URL(encoded);
		expect(decoded).toEqual(numbers);
	});

	it('encodeToBASE64URL should return an empty string for invalid input', () => {
		const invalidNumbers = Array(81)
			.fill(0)
			.map((_, i) => i % 10);
		invalidNumbers[0] = 10;
		const encoded = encodeToBASE64URL(invalidNumbers);
		expect(encoded).toBe('');
	});

	it('decodeFromBASE64URL should return null for invalid base64 string', () => {
		const invalidEncoded = 'invalid_base64_string#';
		const decoded = decodeFromBASE64URL(invalidEncoded);
		expect(decoded).toBeNull();
	});
});
