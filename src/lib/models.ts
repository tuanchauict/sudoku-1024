import type { Board } from "./parser";

export interface CellPosition {
    row: number;
    col: number;
}

export interface SudokuState {
    board: Board;
    notes: boolean[][][];
    selectedCell: CellPosition;
}
