import { decodeFromBASE64URL } from './encoder';
import type { Board, Digit } from '$lib/models';

export function parseBoard(board: string): Board | null {
    const bytes = decodeFromBASE64URL(board);
    if (bytes === null || bytes.length !== 81) {
        return null;
    }

    const sudokuArray: Digit[][] = [];
    for (let i = 0; i < 9; i++) {
        const row: Digit[] = [];
        for (let j = 0; j < 9; j++) {
            row.push(bytes[i * 9 + j] as Digit);
        }
        sudokuArray.push(row);
    }
    return sudokuArray;
}
