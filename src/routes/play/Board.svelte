<script lang="ts">
	import { type Board } from '$lib/repository';

	export let board: Board = [];
	export let notes: number[][][] = [];
	export let selectedCell = { row: -1, col: -1 };

	export let onCellSelect: (row: number, col: number) => void;

	function selectCell(row: number, col: number) {
		onCellSelect(row, col);
	}

	// Check if a cell is part of the same 3x3 box as the selected cell
	function isSameBox(row: number, col: number) {
		if (selectedCell.row === -1 || selectedCell.col === -1) return false;
		const boxRow = Math.floor(row / 3);
		const boxCol = Math.floor(col / 3);
		const selectedBoxRow = Math.floor(selectedCell.row / 3);
		const selectedBoxCol = Math.floor(selectedCell.col / 3);
		return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
	}

	// Check if a cell has the same value as the selected cell
	function hasSameValue(row: number, col: number) {
		if (selectedCell.row === -1 || selectedCell.col === -1) return false;
		const selectedValue = board[selectedCell.row][selectedCell.col];
		return selectedValue && board[row][col] === selectedValue;
	}

	// Count occurrences of each value in the board
	function getValueCounts() {
		const counts = Array(10).fill(0); // 0-9, ignore index 0

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (board[i][j]) {
					counts[board[i][j]]++;
				}
			}
		}

		return counts;
	}

	$: valueCounts = getValueCounts();
</script>

<div class="sudoku-board">
	{#each board as row, rowIndex}
		<div class="row">
			{#each row as cellValue, colIndex}
				<div
					class="cell
                  {rowIndex % 3 === 2 && rowIndex < 8 ? 'border-bottom-thick' : ''} 
                  {colIndex % 3 === 2 && colIndex < 8 ? 'border-right-thick' : ''}
                  {selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
                  {selectedCell.row === rowIndex || selectedCell.col === colIndex
						? 'same-line'
						: ''}
                  {isSameBox(rowIndex, colIndex) &&
					!(selectedCell.row === rowIndex && selectedCell.col === colIndex)
						? 'same-box'
						: ''}
                  {hasSameValue(rowIndex, colIndex) &&
					!(selectedCell.row === rowIndex && selectedCell.col === colIndex)
						? 'same-value'
						: ''}
                  {cellValue && valueCounts[cellValue] >= 9 ? 'complete' : ''}"
					on:click={() => selectCell(rowIndex, colIndex)}
				>
					{#if cellValue}
						<span class="cell-value">{cellValue}</span>
					{:else}
						<!-- Notes grid -->
						<div class="notes-grid">
							{#each Array(9).fill(null) as _, noteIndex}
								<div class="note-cell">
									{#if notes[rowIndex][colIndex][noteIndex]}
										<span class="note-value">{noteIndex + 1}</span>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.sudoku-board {
		border: 4px solid #000;
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
	}

	.cell {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-right: 1px solid #000;
		border-bottom: 1px solid #000;
		cursor: pointer;
	}

	.cell:nth-child(9n) {
		border-right: none;
	}

	.row:last-child .cell {
		border-bottom: none;
	}

	.border-bottom-thick {
		border-bottom: 3px solid #000;
	}

	.border-right-thick {
		border-right: 3px solid #000;
	}

	.selected {
		background-color: #bfdbfe;
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
