import { getContext, setContext } from 'svelte';
import type { SudokuViewModel } from './SudokuViewModel';

export const SUDOKU_CONTEXT_KEY = Symbol('sudoku-view-model');

export function setSudokuViewModel(viewModel: SudokuViewModel): void {
  setContext(SUDOKU_CONTEXT_KEY, viewModel);
}

export function getSudokuViewModel(): SudokuViewModel {
  return getContext<SudokuViewModel>(SUDOKU_CONTEXT_KEY);
}
