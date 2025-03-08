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
        {#if notes.some(note => note)}
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
    
    .same-box {
		background-color: #ebf1f9;
	}

	.same-line {
		background-color: #e6f1ff;
	}

	.same-value {
		background-color: #fff8da;
	}

    .selected {
        outline: 3px solid #f86b00;
        outline-offset: -2px;
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
		font-size: 13.5px;
		color: #3b82f6;
	}
</style>
