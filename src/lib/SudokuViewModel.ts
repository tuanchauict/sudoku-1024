import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { Board, Digit } from '$lib/parser';
import type { CellPosition, SudokuState } from './models';
import { GameStorage } from './storage';
import type { Level } from '$lib/Generator';

export class SudokuViewModel {
    // Private stores
    private state: Writable<SudokuState>;

    // Public derived stores
    public readonly board: Readable<Board>;
    public readonly notes: Readable<boolean[][][]>;
    public readonly selectedCell: Readable<CellPosition>;
    public readonly noteMode: Writable<boolean> = writable(false);

    // Computed values
    public readonly digitCounts: Readable<number[]>;
    public readonly valueCounts: Readable<number[]>;
    public readonly cellEditable: Readable<boolean>;
    public readonly violatedCells: Readable<CellPosition[]>;

    // Public stores for game completion
    public gameComplete: Writable<boolean>;

    public timePass: number;
    private timeStart: number = Date.now();

    constructor(public levelId: Level, public initialBoard: Board) {
        const savedGame = GameStorage.loadCurrentGame(initialBoard);
        const state = savedGame ? savedGame.state : SudokuViewModel.createState(initialBoard);
        this.timePass = savedGame ? savedGame.timePass : 0;
        // Initialize the state
        this.state = writable<SudokuState>(state);

        // Create derived stores for each piece of state

        this.board = derived(this.state, ($state) => $state.board);
        this.notes = derived(this.state, ($state) => $state.notes);
        this.selectedCell = derived(this.state, ($state) => $state.selectedCell);

        // Computed values
        this.digitCounts = derived(this.board, ($board) => this.calculateDigitCounts($board));
        this.valueCounts = derived(this.board, ($board) => this.calculateValueCounts($board));
        this.cellEditable = derived(this.selectedCell, ($selectedCell) => this.isEditableCell($selectedCell.row, $selectedCell.col));
        this.violatedCells = derived(this.board, ($board) => this.findViolatedCells($board));

        // Game completion
        this.gameComplete = writable(false);
    }

    private static createState(initialBoard: Board): SudokuState {
        return {
            board: initialBoard,
            notes: Array(9)
                .fill(null)
                .map(() =>
                    Array(9)
                        .fill(null)
                        .map(() => Array(9).fill(false))
                ),
            selectedCell: { row: -1, col: -1 },
        };
    }

    private get isInNodeMode(): boolean {
        let currentNoteMode: boolean = false;
        const unsubscribe = this.noteMode.subscribe(value => {
            currentNoteMode = value;
        });
        unsubscribe();
        return currentNoteMode;
    }

    private get currentSelectedCell(): CellPosition {
        let currentSelectedCell: CellPosition = { row: -1, col: -1 };
        const unsubscribe = this.selectedCell.subscribe(value => {
            currentSelectedCell = value;
        });
        unsubscribe();
        return currentSelectedCell;
    }

    private get currentBoard(): Board {
        let currentBoard: Board = this.initialBoard;
        const unsubscribe = this.board.subscribe(value => {
            currentBoard = value;
        });
        unsubscribe();
        return currentBoard;
    }

    public clearBoard(): void {
        this.updateState((state) => ({
            ...state,
            board: this.initialBoard,
            notes: Array(9)
                .fill(null)
                .map(() =>
                    Array(9)
                        .fill(null)
                        .map(() => Array(9).fill(false))
                ),
            selectedCell: { row: -1, col: -1 },
            noteMode: false,
        }));
        this.gameComplete.set(false);
    }

    public selectCell(row: number, col: number): void {
        this.updateState((state) => ({
            ...state,
            selectedCell: { row, col }
        }));
    }

    public toggleNoteMode(): void {
        this.noteMode.set(!this.isInNodeMode);
    }

    // Handle number input
    public enterDigit(digit: Digit): void {
        this.updateState((state) => {
            const { row, col } = state.selectedCell;
            if (!this.isEditableCell(row, col)) {
                return state;
            }

            // Create a copy of the board and notes
            const newBoard = [...state.board.map(row => [...row])];
            const newNotes = [...state.notes.map(row => [...row.map(col => [...col])])];

            if (this.isInNodeMode) {
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

        // Check if the game is complete
        this.updateCompleteState();
    }

    // Clear the selected cell
    public clearSelectedCell(): void {
        this.updateState((state) => {
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
        this.gameComplete.set(false);
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
        const currentSelectedCell = this.currentSelectedCell;

        if (!currentSelectedCell || currentSelectedCell.row === -1 || currentSelectedCell.col === -1) {
            return false;
        }

        const boxRow = Math.floor(row / 3);
        const boxCol = Math.floor(col / 3);
        const selectedBoxRow = Math.floor(currentSelectedCell.row / 3);
        const selectedBoxCol = Math.floor(currentSelectedCell.col / 3);

        return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
    }

    public hasSameValue(row: number, col: number): boolean {
        const selectedCell = this.currentSelectedCell;
        const currentBoard = this.currentBoard;

        if (!selectedCell || !currentBoard ||
            selectedCell.row === -1 || selectedCell.col === -1) {
            return false;
        }

        const selectedValue = currentBoard[selectedCell.row][selectedCell.col];
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

    private updateCompleteState() {
        const currentBoard = this.currentBoard;

        const isFill = currentBoard.every(row => row.every(cell => cell > 0));
        if (!isFill) {
            this.gameComplete.set(false);
            return;
        }

        const hasViolations = this.findViolatedCells(currentBoard).length > 0;
        if (hasViolations) {
            this.gameComplete.set(false);
            return;
        }

        this.gameComplete.set(true);
    }

    private updateState(factory: (state: SudokuState) => SudokuState): void {
        this.state.update((state) => {
            const newState = factory(state);
            const timePass = this.timePass + (Date.now() - this.timeStart) / 1000;
            GameStorage.saveCurrentGame(this.initialBoard, newState, timePass);
            return newState;
        });
    }
}
