import { writable, derived, type Writable, type Readable } from 'svelte/store';
import {
	type Board,
	type CellPosition,
	createSudokuState,
	type Digit,
	type Level,
	type SudokuState
} from './models';
import { GameStorage } from './storage';
import { calculateValueCounts, detectChangedCell, findViolatedCells } from '$lib/game-state-helper';
import { equals, getDerivedValue } from '$lib/utils';

const EMPTY_STATE: SudokuState = createSudokuState(0, Array(9).fill(Array(9).fill(0)));

export class SudokuViewModel {
	// Private stores
	private initialBoard: Board = EMPTY_STATE.initialBoard;
	private readonly state: Writable<SudokuState> = writable(EMPTY_STATE);
	private readonly stateHistoryStack: SudokuState[] = [];

	// Public derived stores
	public readonly board: Readable<Board>;
	public readonly notes: Readable<boolean[][][]>;
	public readonly selectedCell: Readable<CellPosition>;
	public readonly noteMode: Writable<boolean> = writable(false);

	// Computed values
	public readonly valueCounts: Readable<number[]>;
	public readonly cellEditable: Readable<boolean>;
	public readonly violatedCells: Readable<CellPosition[]>;

	// Public stores for game completion
	public gameComplete: Writable<boolean> = writable(false);

	public readonly timePass: Writable<number> = writable(0);
	private readonly timeStart: Writable<number> = writable(Date.now());

	public readonly canUndo: Writable<boolean> = writable(false);

	constructor() {
		// Create derived stores for each piece of state
		this.board = derived(this.state, ($state) => $state.board);
		this.notes = derived(this.state, ($state) => $state.notes);
		this.selectedCell = derived(this.state, ($state) => $state.selectedCell);

		// Computed values
		this.valueCounts = derived(this.board, (board) => calculateValueCounts(board));
		this.cellEditable = derived(this.selectedCell, ($selectedCell) =>
			this.isEditableCell($selectedCell.row, $selectedCell.col)
		);
		this.violatedCells = derived(this.board, (board) => findViolatedCells(board));
	}

	init(level: Level, initialBoard: Board) {
		const savedGame = GameStorage.loadCurrentGame(initialBoard);
		const state = savedGame ? savedGame.state : createSudokuState(level, initialBoard);

		this.state.set(state);
		this.initialBoard = initialBoard;
		this.stateHistoryStack.length = 0;

		this.timePass.set(savedGame ? savedGame.timePass : 0);
		this.timeStart.set(Date.now());
	}

	private get isInNodeMode(): boolean {
		return getDerivedValue(this.noteMode);
	}

	clearBoard(): void {
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
			noteMode: false
		}));
		this.gameComplete.set(false);
	}

	selectCell(row: number, col: number): void {
		this.updateState((state) => ({
			...state,
			selectedCell: { row, col }
		}));
	}

	toggleNoteMode(): void {
		this.noteMode.set(!this.isInNodeMode);
	}

	// Handle number input
	enterDigit(digit: Digit): void {
		this.updateState((state) => {
			const { row, col } = state.selectedCell;
			if (!this.isEditableCell(row, col)) {
				return state;
			}

			// Create a copy of the board and notes
			const newBoard = [...state.board.map((row) => [...row])];
			const newNotes = [...state.notes.map((row) => [...row.map((col) => [...col])])];

			if (this.isInNodeMode) {
				// Toggle the note for this digit
				newNotes[row][col][digit - 1] = !newNotes[row][col][digit - 1];
			} else {
				newBoard[row][col] = digit;

				// Clear the notes of the same digit in the same row, column, and box
				const boxStartRow = Math.floor(row / 3) * 3;
				const boxStartCol = Math.floor(col / 3) * 3;
				for (let i = 0; i < 9; i++) {
					newNotes[row][i][digit - 1] = false;
					newNotes[i][col][digit - 1] = false;

					const r = boxStartRow + Math.floor(i / 3);
					const c = boxStartCol + (i % 3);
					newNotes[r][c][digit - 1] = false;
				}
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

	clearSelectedCell(): void {
		this.updateState((state) => {
			const { row, col } = state.selectedCell;
			if (!this.isEditableCell(row, col)) {
				return state;
			}

			// Create a copy of the board and notes
			const newBoard = [...state.board.map((row) => [...row])];
			const newNotes = [...state.notes.map((row) => [...row.map((col) => [...col])])];

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

	undo(): void {
		const lastState = this.stateHistoryStack.pop();
		if (!lastState) {
			return;
		}
		this.state.set({
			...lastState,
			selectedCell: detectChangedCell(lastState, getDerivedValue(this.state))
		});
		this.canUndo.set(this.stateHistoryStack.length > 0);
	}

	isInitial(row: number, col: number): boolean {
		return this.initialBoard[row][col] !== 0;
	}

	// Helper methods for checking cell relationships
	isSameBox(row: number, col: number): boolean {
		const currentSelectedCell = getDerivedValue(this.selectedCell);

		if (!currentSelectedCell || currentSelectedCell.row === -1 || currentSelectedCell.col === -1) {
			return false;
		}

		const boxRow = Math.floor(row / 3);
		const boxCol = Math.floor(col / 3);
		const selectedBoxRow = Math.floor(currentSelectedCell.row / 3);
		const selectedBoxCol = Math.floor(currentSelectedCell.col / 3);

		return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
	}

	hasSameValue(row: number, col: number): boolean {
		const selectedCell = getDerivedValue(this.selectedCell);
		const currentBoard = getDerivedValue(this.board);

		if (!selectedCell || !currentBoard || selectedCell.row === -1 || selectedCell.col === -1) {
			return false;
		}

		const selectedValue = currentBoard[selectedCell.row][selectedCell.col];
		return Boolean(selectedValue && currentBoard[row][col] === selectedValue);
	}

	private isEditableCell(row: number, col: number): boolean {
		if (row === -1 || col === -1) {
			return false;
		}
		return this.initialBoard[row][col] === 0;
	}

	private updateCompleteState() {
		const currentBoard = getDerivedValue(this.board);

		const isFill = currentBoard.every((row) => row.every((cell) => cell > 0));
		if (!isFill) {
			this.gameComplete.set(false);
			return;
		}

		const hasViolations = findViolatedCells(currentBoard).length > 0;
		if (hasViolations) {
			this.gameComplete.set(false);
			return;
		}

		this.gameComplete.set(true);
	}

	private updateState(factory: (state: SudokuState) => SudokuState): void {
		this.state.update((state) => {
			const newState = factory(state);
			const timeStart = getDerivedValue(this.timeStart);
			const timePass = getDerivedValue(this.timePass) + (Date.now() - timeStart) / 1000;
			GameStorage.saveCurrentGame(this.initialBoard, newState, timePass);

			const isSameState =
				equals(state.board, newState.board) && equals(state.notes, newState.notes);
			if (!isSameState) {
				this.stateHistoryStack.push(state);
				this.canUndo.set(true);
			}
			return newState;
		});
	}
}
