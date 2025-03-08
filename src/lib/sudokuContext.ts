// $lib/sudokuContext.ts
import { getContext, setContext } from 'svelte';
import type { SudokuViewModel } from './SudokuViewModel';

// Create a unique key for our context
export const SUDOKU_CONTEXT_KEY = Symbol('sudoku-view-model');

// Set the ViewModel in context
export function setSudokuViewModel(viewModel: SudokuViewModel): void {
  setContext(SUDOKU_CONTEXT_KEY, viewModel);
}

// Get the ViewModel from context
export function getSudokuViewModel(): SudokuViewModel {
  return getContext<SudokuViewModel>(SUDOKU_CONTEXT_KEY);
}
