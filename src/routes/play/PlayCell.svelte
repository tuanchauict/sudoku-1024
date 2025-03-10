<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import type { CellPosition } from '$lib/SudokuViewModel';

	export let rowIndex: number;
	export let colIndex: number;
	export let cellValue: number;
	export let isInitial: boolean;
	export let notes: boolean[];
	export let selectedCell: { row: number; col: number };
	export let valueCounts: number[];
	export let violatedCells: CellPosition[];

	$: isViolated = violatedCells.some(cell => cell.row === rowIndex && cell.col === colIndex);


	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	// Use ViewModel for these calculations
	function isSameBox(row: number, col: number) {
		return viewModel.isSameBox(row, col);
	}

	function hasSameValue(row: number, col: number) {
		return viewModel.hasSameValue(row, col);
	}
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="cell"
		 class:selected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
		 class:same-line={selectedCell.row === rowIndex || selectedCell.col === colIndex}
		 class:same-box={isSameBox(rowIndex, colIndex) &&
        !(selectedCell.row === rowIndex && selectedCell.col === colIndex)}
		 class:same-value={hasSameValue(rowIndex, colIndex) &&
        !(selectedCell.row === rowIndex && selectedCell.col === colIndex)}
		 class:complete={cellValue && valueCounts[cellValue] >= 9}
		 class:violated={isViolated}
		 class:initial={isInitial}
		 on:click={() => viewModel.selectCell(rowIndex, colIndex)}
>
	{#if cellValue}
		<span class="cell-value">{cellValue}</span>
	{:else}
		{#if notes.some(note => note)}
			<!-- Notes grid -->
			<div class="notes-grid">
				{#each Array(9).fill(null) as _, noteIndex}
					{#if notes[noteIndex]}
						<div class="note-cell">

							<span class="note-value">{noteIndex + 1}</span>

						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
    .cell {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        user-select: none;
    }

    .same-box {
        background-color: #eff4fa;
    }

    .same-line {
        background-color: #f0f7ff;
    }

    .same-value {
        background-color: #fff8da;
    }

    .selected {
        outline: 4px solid #21cb65CC;
        position: relative;
        z-index: 1;
        background-color: #fff5ce;
    }

    .complete {
        color: #059669;
    }

    .cell-value {
        font-weight: bold;
        color: rgb(26, 95, 255);
        user-select: none;
				font-family: monospace;

				@media (max-device-width: 500px) {
					font-size: 1.2rem;
        }
    }

    .notes-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .note-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        height: 30%;
    }

    .note-value {
        font-size: 0.8rem;
        color: #3b82f6;
        font-family: monospace;
    }

    .violated {
        background-color: #fcd3d3;
    }

    .violated .cell-value {
        color: #ca0000;
    }

    .initial .cell-value {
        color: black;
    }
</style>
