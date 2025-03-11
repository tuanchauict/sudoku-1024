export type Level = 0 | 1 | 2 | 3 | 4;

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Board = Digit[][];

export interface CellPosition {
	row: number;
	col: number;
}

export interface SudokuState {
	level: Level;
	initialBoard: Board;
	board: Board;
	notes: boolean[][][];
	selectedCell: CellPosition;
}

export function createSudokuState(level: Level, initialBoard: Board): SudokuState {
	const notes = Array(9)
		.fill(null)
		.map(() =>
			Array(9)
				.fill(null)
				.map(() => Array(9).fill(false))
		);
	return {
		level,
		initialBoard,
		board: initialBoard,
		notes,
		selectedCell: { row: -1, col: -1 }
	};
}

export interface LevelType {
	id: Level;
	name: string;
	color: string;
	gradient: string;
	icon: string;
}

export const LEVELS = [
	{
		id: 0,
		name: 'Random',
		color: '#6b7280',
		gradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
		icon: '❓'
	},
	{
		id: 1,
		name: 'Easy',
		color: '#4ade80',
		gradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
		icon: '⭐'
	},
	{
		id: 2,
		name: 'Medium',
		color: '#60a5fa',
		gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
		icon: '⭐⭐'
	},
	{
		id: 3,
		name: 'Hard',
		color: '#f97316',
		gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
		icon: '⭐⭐⭐'
	},
	{
		id: 4,
		name: 'Diabolic',
		color: '#ef4444',
		gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
		icon: '⭐⭐⭐⭐'
	}
] as LevelType[];
