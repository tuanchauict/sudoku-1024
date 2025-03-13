<script lang="ts">
	import { onMount } from 'svelte';
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import PlayCell from './PlayCell.svelte';
	import type { Board, CellPosition } from '$lib/models';

	let board: Board = [];
	let notes: boolean[][][] = [];
	let selectedCell = { row: -1, col: -1 };

	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	// Local state for value counts
	let valueCounts: number[] = [];
	let violatedCells: CellPosition[] = [];

	// Subscribe to the valueCounts store once the component is mounted
	onMount(() => {
		const unsubBoard = viewModel.board.subscribe((value) => {
			board = value;
		});

		const unsubNotes = viewModel.notes.subscribe((value) => {
			notes = value;
		});

		const unsubSelectedCell = viewModel.selectedCell.subscribe((value) => {
			selectedCell = value;
		});

		const unsubValueCount = viewModel.valueCounts.subscribe((value) => {
			valueCounts = value;
		});
		const unsubViolatedCells = viewModel.violatedCells.subscribe((value) => {
			violatedCells = value;
		});

		return () => {
			unsubBoard();
			unsubNotes();
			unsubSelectedCell();
			unsubValueCount();
			unsubViolatedCells();
		};
	});
</script>

<div class="sudoku-board">
	{#each board as row, rowIndex (rowIndex)}
		<div class="row">
			{#each row as cellValue, colIndex (colIndex)}
				<div
					class="cell"
					class:border-bottom-thick={rowIndex % 3 === 2 && rowIndex < 8}
					class:border-right-thick={colIndex % 3 === 2 && colIndex < 8}
				>
					<PlayCell
						{rowIndex}
						{colIndex}
						{cellValue}
						isInitial={viewModel.isInitial(rowIndex, colIndex)}
						notes={notes[rowIndex][colIndex]}
						{selectedCell}
						{valueCounts}
						{violatedCells}
					/>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
    .sudoku-board {
        border: 2px solid var(--border-color-strong);
        display: flex;
        flex-direction: column;
        width: 100%;
        aspect-ratio: 1;
        box-sizing: border-box;
        user-select: none;
        touch-action: manipulation;
    }

    .row {
        display: flex;
        flex: 1;
    }

    .cell {
        flex: 1;
        position: relative;
        border-right: 1px solid var(--border-color-strong);
        border-bottom: 1px solid var(--border-color-strong);
        cursor: pointer;
        overflow: visible;
    }

    .cell:nth-child(9n) {
        border-right: none;
    }

    .row:last-child .cell {
        border-bottom: none;
    }

    .border-bottom-thick {
        border-bottom: 2px solid var(--border-color-strong);
    }

    .border-right-thick {
        border-right: 2px solid var(--border-color-strong);
    }
</style>