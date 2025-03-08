import QQWing from 'qqwing';


export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Level = 'Easy' | 'Medium' | 'Hard' | 'Diabolic';
export type Board = Digit[][];

export const qq = new QQWing();
qq.setPrintStyle(0);
qq.setRecordHistory(true);

const pool = {
    Unknown: [] as string[],
    Easy: [] as string[],
    Medium: [] as string[],
    Hard: [] as string[],
    Diabolic: [] as string[],
}

const levelMapper = ['Unknown', 'Easy', 'Medium', 'Hard', 'Diabolic'];

export function generateBoard(level: Level): string {
    if (pool[level].length > 0) {
        return pool[level].pop()!;
    }
    let count = 0;
    const levelPool = pool[level];

    while (levelPool.length < 10) {
        qq.generatePuzzleSymmetry(5);
        const puzzle = qq.getPuzzleString();
        qq.solve();
        const difficulty = qq.getDifficulty();
        const level = levelMapper[difficulty] as Level;
        if (pool[level].length < 100) {
            pool[levelMapper[difficulty] as Level].push(puzzle);
        }
        count += 1;
        if (count > 300) {
            break;
        }
    }
    return levelPool.pop()!;
}

export function prepareDataPool() {
    while (pool.Easy.length < 10 || pool.Medium.length < 10 || pool.Hard.length < 10 || pool.Diabolic.length < 10) {
        qq.generatePuzzleSymmetry(5);
        const puzzle = qq.getPuzzleString();
        qq.solve();
        const difficulty = qq.getDifficulty();
        pool[levelMapper[difficulty] as Level].push(puzzle);
    }
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