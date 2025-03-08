declare module 'qqwing' {
    export default class QQWing {
        constructor();

        // Constants
        static readonly DIFFICULTY_SIMPLE: number;
        static readonly DIFFICULTY_EASY: number;
        static readonly DIFFICULTY_INTERMEDIATE: number;
        static readonly DIFFICULTY_EXPERT: number;

        // Methods
        setRecordHistory(record: boolean): void;
        setLogHistory(log: boolean): void;
        setPrintStyle(style: number): void;
        setDifficulty(difficulty: number): void;
        generatePuzzle(): boolean;
        generatePuzzleSymmetry(symmetry: number): boolean;
        solve(): boolean;
        getPuzzle(): number[];
        getSolutionString(): number[];
        getDifficulty(): number;
        getDifficultyAsString(): string;
        countSolutions(): number;
        getPuzzleString(): string;
    }
}