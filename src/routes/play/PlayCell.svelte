<script lang="ts">
	import { getSudokuViewModel } from "$lib/sudokuContext";

    export let rowIndex: number;
    export let colIndex: number;
    export let cellValue: number;
    export let notes: boolean[];
    export let selectedCell: { row: number; col: number };
    export let valueCounts: number[];

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
    on:click={() => viewModel.selectCell(rowIndex, colIndex)}
>
    {#if cellValue}
        <span class="cell-value">{cellValue}</span>
    {:else}
        <!-- Notes grid -->
        <div class="notes-grid">
            {#each Array(9).fill(null) as _, noteIndex}
                <div class="note-cell">
                    {#if notes[noteIndex]}
                        <span class="note-value">{noteIndex + 1}</span>
                    {/if}
                </div>
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
        font-size: 24px;
    }

	.same-line {
		background-color: #dbeafe;
	}

	.same-box {
		background-color: #eff6ff;
	}

	.same-value {
		background-color: #fef3c7;
	}

    .selected {
		background-color: #b9ffbb;
	}

	.complete {
		color: #059669;
	}

	.cell-value {
		font-size: 24px;
		font-weight: bold;
	}

	.notes-grid {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}

	.note-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.note-value {
		font-size: 12px;
		color: #3b82f6;
	}
</style>
