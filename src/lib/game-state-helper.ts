import type { Board, CellPosition, SudokuState } from '$lib/models';
import { equals } from '$lib/utils';

export function findViolatedCells(board: Board): CellPosition[] {
	const violations: CellPosition[] = [];

	// Helper to check if a position is already in the violations list
	const isAlreadyViolated = (row: number, col: number) => {
		return violations.some((pos) => pos.row === row && pos.col === col);
	};

	// Check each cell
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const value = board[row][col];

			// Skip empty cells
			if (!value) continue;

			// Skip cells already marked as violations
			if (isAlreadyViolated(row, col)) continue;

			// Check row
			for (let c = 0; c < 9; c++) {
				if (c !== col && board[row][c] === value) {
					if (!isAlreadyViolated(row, col)) violations.push({ row, col });
					if (!isAlreadyViolated(row, c)) violations.push({ row, col: c });
				}
			}

			// Check column
			for (let r = 0; r < 9; r++) {
				if (r !== row && board[r][col] === value) {
					if (!isAlreadyViolated(row, col)) violations.push({ row, col });
					if (!isAlreadyViolated(r, col)) violations.push({ row: r, col });
				}
			}

			// Check 3x3 box
			const boxRow = Math.floor(row / 3) * 3;
			const boxCol = Math.floor(col / 3) * 3;

			for (let r = boxRow; r < boxRow + 3; r++) {
				for (let c = boxCol; c < boxCol + 3; c++) {
					if ((r !== row || c !== col) && board[r][c] === value) {
						if (!isAlreadyViolated(row, col)) violations.push({ row, col });
						if (!isAlreadyViolated(r, c)) violations.push({ row: r, col: c });
					}
				}
			}
		}
	}
	return violations;
}

export function detectChangedCell(
	previousState: SudokuState,
	currentState: SudokuState
): CellPosition {
	let row = 0;
	let col = 0;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (
				currentState.board[i][j] !== previousState.board[i][j] ||
				!equals(currentState.notes[i][j], previousState.notes[i][j])
			) {
				row = i;
				col = j;
				break;
			}
		}
	}
	return { row, col };
}

export function calculateValueCounts(board: Board): number[] {
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