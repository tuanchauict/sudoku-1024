<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import type { CellPosition } from '$lib/models';
	import { onMount } from 'svelte';

	export let rowIndex: number;
	export let colIndex: number;
	export let cellValue: number;
	export let isInitial: boolean;
	export let notes: boolean[];
	export let selectedCell: { row: number; col: number };
	export let valueCounts: number[];
	export let violatedCells: CellPosition[];

	$: isViolated = violatedCells.some(cell => cell.row === rowIndex && cell.col === colIndex);

	const viewModel = getSudokuViewModel();

	let isInNoteMode: boolean = false;

	// Use ViewModel for these calculations
	function isSameBox(row: number, col: number) {
		return viewModel.isSameBox(row, col);
	}

	function hasSameValue(row: number, col: number) {
		return viewModel.hasSameValue(row, col);
	}

	onMount(() => {
		const unsubNoteMode = viewModel.noteMode.subscribe((value) => {
			isInNoteMode = value;
		});

		return () => {
			unsubNoteMode();
		};
	})
</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="cell"
		 class:note-mode={isInNoteMode}
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
        background-color: var(--bg-cell-same-box);
    }

    .same-line {
        background-color: var(--bg-cell-same-line);
    }

    .same-value {
        background-color: var(--bg-cell-same-value);
    }

    .selected {
        outline: 4px solid var(--color-success);
        position: relative;
        z-index: 1;
        background-color: var(--bg-cell-selected);

				&.note-mode {
						outline-color: var(--color-selected-cell-note);
				}
    }

    .complete {
        color: var(--color-success-text);
    }

    .cell-value {
        font-weight: bold;
        color: var(--text-value);
        user-select: none;
        font-family: monospace;

        @media (max-device-width: 500px) {
            font-size: 1.2rem;
        }

        @media (max-device-width: 380px) {
            font-size: 1.1rem;
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
        color: var(--text-note);
        font-family: monospace;
    }

    .violated {
        background-color: var(--bg-cell-violated);

        .cell-value {
            color: var(--color-danger-text);
        }
    }

    .initial .cell-value {
        color: var(--text-value-initial);
    }
</style>
