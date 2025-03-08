import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { Board, Digit, Level } from '$lib/repository';

export interface CellPosition {
    row: number;
    col: number;
}

export interface SudokuState {
    initialBoard: Board;
    board: Board;
    notes: boolean[][][];
    selectedCell: CellPosition;
    noteMode: boolean;
    levelId: Level;
}

export class SudokuViewModel {
    // Private stores
    private state: Writable<SudokuState>;

    // Public derived stores
    public readonly board: Readable<Board>;
    public readonly notes: Readable<boolean[][][]>;
    public readonly selectedCell: Readable<CellPosition>;
    public readonly noteMode: Readable<boolean>;
    public readonly levelId: Readable<Level>;

    // Computed values
    public readonly digitCounts: Readable<number[]>;
    public readonly valueCounts: Readable<number[]>;
    public readonly cellEditable: Readable<boolean>;
    public readonly violatedCells: Readable<CellPosition[]>;

    constructor(levelId: Level, public initialBoard: Board) {
        // Initialize the state
        this.state = writable<SudokuState>({
            initialBoard,
            board: initialBoard,
            notes: Array(9)
                .fill(null)
                .map(() =>
                    Array(9)
                        .fill(null)
                        .map(() => Array(9).fill(false))
                ),
            selectedCell: { row: -1, col: -1 },
            noteMode: false,
            levelId,
        });

        // Create derived stores for each piece of state
        
        this.board = derived(this.state, ($state) => $state.board);
        this.notes = derived(this.state, ($state) => $state.notes);
        this.selectedCell = derived(this.state, ($state) => $state.selectedCell);
        this.noteMode = derived(this.state, ($state) => $state.noteMode);
        this.levelId = derived(this.state, ($state) => $state.levelId);

        // Computed values
        this.digitCounts = derived(this.board, ($board) => this.calculateDigitCounts($board));
        this.valueCounts = derived(this.board, ($board) => this.calculateValueCounts($board));
        this.cellEditable = derived(this.selectedCell, ($selectedCell) => this.isEditableCell($selectedCell.row, $selectedCell.col));
        this.violatedCells = derived(this.board, ($board) => this.findViolatedCells($board));
    }

    public selectCell(row: number, col: number): void {
        this.state.update((state) => ({
            ...state,
            selectedCell: { row, col }
        }));
    }

    public toggleNoteMode(): void {
        this.state.update((state) => ({
            ...state,
            noteMode: !state.noteMode
        }));
    }

    // Handle number input
    public enterDigit(digit: Digit): void {
        this.state.update((state) => {
            const { row, col } = state.selectedCell;
            if (!this.isEditableCell(row, col)) {
                return state;
            }

            // Create a copy of the board and notes
            const newBoard = [...state.board.map(row => [...row])];
            const newNotes = [...state.notes.map(row => [...row.map(col => [...col])])];

            if (state.noteMode) {
                // Toggle the note for this digit
                newNotes[row][col][digit - 1] = !newNotes[row][col][digit - 1];
            } else {
                newBoard[row][col] = digit;
            }

            return {
                ...state,
                board: newBoard,
                notes: newNotes
            };
        });
    }

    // Clear the selected cell
    public clearSelectedCell(): void {
        this.state.update((state) => {
            const { row, col } = state.selectedCell;

            if (!this.isEditableCell(row, col)) {
                return state;
            }

            // Create a copy of the board and notes
            const newBoard = [...state.board.map(row => [...row])];
            const newNotes = [...state.notes.map(row => [...row.map(col => [...col])])];

            if (newBoard[row][col] !== 0) {
                // Clear the cell value if it has a value
                newBoard[row][col] = 0;
            } else {
                // Clear the notes if the cell is already empty
                newNotes[row][col] = Array(9).fill(false);
            }

            return {
                ...state,
                board: newBoard,
                notes: newNotes
            };
        });
    }

    // Helper methods for computed values
    private calculateDigitCounts(board: Board): number[] {
        const counts = Array(9).fill(0);

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] > 0) {
                    counts[board[row][col] - 1]++;
                }
            }
        }

        return counts;
    }

    private calculateValueCounts(board: Board): number[] {
        const counts = Array(10).fill(0); // 0-9, ignore index 0

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col]) {
                    counts[board[row][col]]++;
                }
            }
        }

        return counts;
    }

    // Helper methods for checking cell relationships
    public isSameBox(row: number, col: number): boolean {
        let currentSelectedCell: CellPosition | undefined;
        const unsubscribe = this.selectedCell.subscribe(value => {
            currentSelectedCell = value;
        });
        unsubscribe();

        if (!currentSelectedCell || currentSelectedCell.row === -1 || currentSelectedCell.col === -1) return false;

        const boxRow = Math.floor(row / 3);
        const boxCol = Math.floor(col / 3);
        const selectedBoxRow = Math.floor(currentSelectedCell.row / 3);
        const selectedBoxCol = Math.floor(currentSelectedCell.col / 3);

        return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
    }

    public hasSameValue(row: number, col: number): boolean {
        let currentSelectedCell: CellPosition | undefined;
        let currentBoard: Board | undefined;

        const unsubscribe1 = this.selectedCell.subscribe(value => {
            currentSelectedCell = value;
        });
        unsubscribe1();

        const unsubscribe2 = this.board.subscribe(value => {
            currentBoard = value;
        });
        unsubscribe2();

        if (!currentSelectedCell || !currentBoard ||
            currentSelectedCell.row === -1 || currentSelectedCell.col === -1) return false;

        const selectedValue = currentBoard[currentSelectedCell.row][currentSelectedCell.col];
        return Boolean(selectedValue && currentBoard[row][col] === selectedValue);
    }

    private isEditableCell(row: number, col: number): boolean {
        if (row === -1 || col === -1) {
            return false
        };
        return this.initialBoard[row][col] === 0;
    }

    private findViolatedCells($board: Board): CellPosition[] {
        const violations: CellPosition[] = [];

        // Helper to check if a position is already in the violations list
        const isAlreadyViolated = (row: number, col: number) => {
            return violations.some(pos => pos.row === row && pos.col === col);
        };

        // Check each cell
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = $board[row][col];

                // Skip empty cells
                if (!value) continue;

                // Skip cells already marked as violations
                if (isAlreadyViolated(row, col)) continue;

                // Check row
                for (let c = 0; c < 9; c++) {
                    if (c !== col && $board[row][c] === value) {
                        if (!isAlreadyViolated(row, col)) violations.push({ row, col });
                        if (!isAlreadyViolated(row, c)) violations.push({ row, col: c });
                    }
                }

                // Check column
                for (let r = 0; r < 9; r++) {
                    if (r !== row && $board[r][col] === value) {
                        if (!isAlreadyViolated(row, col)) violations.push({ row, col });
                        if (!isAlreadyViolated(r, col)) violations.push({ row: r, col });
                    }
                }

                // Check 3x3 box
                const boxRow = Math.floor(row / 3) * 3;
                const boxCol = Math.floor(col / 3) * 3;

                for (let r = boxRow; r < boxRow + 3; r++) {
                    for (let c = boxCol; c < boxCol + 3; c++) {
                        if ((r !== row || c !== col) && $board[r][c] === value) {
                            if (!isAlreadyViolated(row, col)) violations.push({ row, col });
                            if (!isAlreadyViolated(r, c)) violations.push({ row: r, col: c });
                        }
                    }
                }
            }
        }
        return violations;
    }
}
