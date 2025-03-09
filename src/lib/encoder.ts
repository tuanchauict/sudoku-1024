// Base64 URL-friendly character set (A-Z, a-z, 0-9, -, _)
// Standard Base64 uses +/ but we replace with -_ for URL safety
const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Encodes an array of 81 numbers (values 0-9) to a URL-friendly base64 string
 * This is useful for encoding a Sudoku board (9x9 grid with values 0-9, where 0 represents an empty cell)
 */
export function encodeToBASE64URL(numbers: number[]): string {
    // Validate input array
    if (numbers.length !== 81) {
        throw new Error('Input array must have exactly 81 numbers');
    }

    if (!numbers.every(num => num >= 0 && num <= 9)) {
        console.error("All numbers must be between 0 and 9", numbers);
        return "";
    }

    // Encode using a more efficient approach for base64
    // Each trio of 0-9 digits can be represented as a number from 0-999
    // 0-999 needs 10 bits to represent (2^10 = 1024)
    let bits = '';

    // Process three numbers at a time
    for (let i = 0; i < numbers.length; i += 3) {
        // Convert the three digits into a single number (e.g., [3,4,5] -> 345)
        // We'll use a different approach since numbers are 0-9
        const val1 = i < numbers.length ? numbers[i] : 0;
        const val2 = i + 1 < numbers.length ? numbers[i + 1] : 0;
        const val3 = i + 2 < numbers.length ? numbers[i + 2] : 0;

        // Combine values: val1*100 + val2*10 + val3
        // For 0-9 digits, this gives values 0-999
        const combinedValue = val1 * 100 + val2 * 10 + val3;

        // Convert to 10-bit binary
        const binaryChunk = combinedValue.toString(2).padStart(10, '0');
        bits += binaryChunk;
    }

    // Convert 6 bits at a time to base64 characters
    let encoded = '';
    for (let i = 0; i < bits.length; i += 6) {
        const chunk = bits.substring(i, i + 6).padEnd(6, '0');
        const index = parseInt(chunk, 2);
        encoded += base64Chars[index];
    }

    return encoded;
}

/**
 * Decodes a URL-friendly base64 string back to an array of 81 numbers (values 0-9)
 */
export function decodeFromBASE64URL(encoded: string): number[] | null{
    // Convert base64 URL string to binary
    let bits = '';
    for (const char of encoded) {
        const index = base64Chars.indexOf(char);
        if (index === -1) {
            console.error(`Invalid base64 URL character: ${char}`);
            return null;
        }

        // Convert index to 6-bit binary
        bits += index.toString(2).padStart(6, '0');
    }

    // Decode the binary bits back to numbers
    const numbers: number[] = [];

    // Process 10 bits at a time to get the 3-digit combined values
    for (let i = 0; i < bits.length; i += 10) {
        if (i + 10 > bits.length) break; // Avoid incomplete chunks

        const chunk = bits.substring(i, i + 10);
        const combinedValue = parseInt(chunk, 2);

        // Extract the three individual digits from the combined value
        const val1 = Math.floor(combinedValue / 100);
        const val2 = Math.floor((combinedValue % 100) / 10);
        const val3 = combinedValue % 10;

        // Add to our numbers array
        numbers.push(val1, val2, val3);

        // Stop once we have 81 numbers
        if (numbers.length >= 81) {
            break;
        }
    }

    // Trim to exactly 81 numbers
    return numbers.slice(0, 81);
}
