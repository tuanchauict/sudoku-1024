<script lang="ts">
	import PlayBoard from './PlayBoard.svelte';
	import Digits from './Digits.svelte';
	import Actions from './Actions.svelte';
	import { goto } from '$app/navigation';
	import type { Board, Digit, Level } from '$lib/repository';


	export let levelId: Level;
	export let initialBoard: Board;

	// Initialize the board and notes
	let board = initialBoard;
	let notes = Array(9)
		.fill(null)
		.map(() =>
			Array(9)
				.fill(null)
				.map(() => Array(9).fill(false))
		);

	// Track which cell is currently selected
	let selectedCell = { row: -1, col: -1 };

	// Track whether we're in "note mode"
	let noteMode = false;

	// Handle cell selection
	function handleCellSelect(row: number, col: number) {
		selectedCell = { row, col };
	}

	// Handle number input
	function handleNumberInput(digit: Digit) {
		const { row, col } = selectedCell;

		if (row === -1 || col === -1) return;

		if (noteMode) {
			// Toggle the note for this digit
			notes[row][col][digit - 1] = !notes[row][col][digit - 1];
		} else {
			// Clear any notes when setting a value
			board[row][col] = digit;
			notes[row][col] = Array(9).fill(false);
		}

		// Force reactivity
		board = [...board];
		notes = [...notes];
	}

	// Toggle note mode
	function handleToggleNoteMode() {
		noteMode = !noteMode;
	}

	// Clear the selected cell
	function handleClearCell() {
		const { row, col } = selectedCell;
		if (row === -1 || col === -1) return;

		board[row][col] = 0;
		notes[row][col] = Array(9).fill(false);

		// Force reactivity
		board = [...board];
		notes = [...notes];
	}

	// Handle keyboard input
	function handleKeydown(event: KeyboardEvent) {
		const { row, col } = selectedCell;

		// Only proceed if a cell is selected and key is a number from 1-9
		if (row === -1 || col === -1 || !event.key.match(/[1-9]/)) return;

		const digit: Digit = parseInt(event.key, 10) as Digit;
		handleNumberInput(digit);
	}

	function goBack() {
		goto('/');
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
	<div class="header">
		<button class="back-btn" on:click={goBack}> ← Back </button>
		<h1>{levelId}</h1>
	</div>

	<div class="tip">
		Tip: Select a cell and press 1-9 to enter values. Use note mode for candidates.
	</div>

	<PlayBoard {board} {notes} {selectedCell} onCellSelect={handleCellSelect} />

	<Digits {board} onDigit={handleNumberInput} />

	<Actions {noteMode} onToggleNoteMode={handleToggleNoteMode} onClearCell={handleClearCell} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		font-family: Arial, sans-serif;
		max-width: 600px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 16px;
		position: relative;
	}

	h1 {
		font-size: 28px;
		font-weight: bold;
		flex-grow: 1;
		text-align: center;
	}

	.back-btn {
		background-color: transparent;
		border: none;
		font-size: 16px;
		color: #3b82f6;
		cursor: pointer;
		padding: 8px;
		position: absolute;
		left: 0;
	}

	.back-btn:hover {
		text-decoration: underline;
	}

	.tip {
		font-size: 14px;
		color: #666;
		margin-bottom: 12px;
		text-align: center;
	}
</style>
