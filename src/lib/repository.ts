
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Level = 'Easy' | 'Medium' | 'Hard' | 'Diabolic';
export type Board = Digit[][];

export function generateBoard(level: Level): Digit[][] {
    // TODO: Implement the board generation
    return parseBoard('.9.3.6..4.....5.9....2.....3............8...1.2.9.35....35..1..6.......85.81.46..')!;
}

export function parseBoard(board: string): Digit[][] | null {
    // Remove any whitespace from the string
    const cleanString = board.replace(/\s/g, '');

    // Ensure the string has exactly 81 characters (9x9)
    if (cleanString.length !== 81) {
        return null;
    }

    // Initialize the 9x9 array
    const sudokuArray: Digit[][] = [];

    // Fill the array row by row
    for (let i = 0; i < 9; i++) {
        const row: Digit[] = [];
        for (let j = 0; j < 9; j++) {
            const char = cleanString[i * 9 + j];
            // Convert dots to zeros, and digits to numbers
            row.push(char === '.' ? 0 : parseInt(char, 10) as Digit);
        }
        sudokuArray.push(row);
    }

    return sudokuArray;
}