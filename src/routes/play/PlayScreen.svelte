<script lang="ts">
	import PlayBoard from './PlayBoard.svelte';
	import Digits from './Digits.svelte';
	import Actions from './Actions.svelte';
	import { goto } from '$app/navigation';
	import type { Board, Level, Digit } from '$lib/repository';
	import { SudokuViewModel } from '$lib/SudokuViewModel';
	import { onMount } from 'svelte';
	import { setSudokuViewModel } from '$lib/sudokuContext';

	export let levelId: Level;
	export let initialBoard: Board;

	// Create the view model and set it in context
	const viewModel = new SudokuViewModel(levelId, initialBoard);
	setSudokuViewModel(viewModel);

	// Create reactive variables from stores
	let board: Board = [];
	let notes: boolean[][][] = [];
	let selectedCell = { row: -1, col: -1 };
	let noteMode = false;
	let digitCounts = Array(9).fill(0);
	
	// Subscribe to stores from the viewModel
	onMount(() => {
		const unsubBoard = viewModel.board.subscribe(value => {
			board = value;
		});
		
		const unsubNotes = viewModel.notes.subscribe(value => {
			notes = value;
		});
		
		const unsubSelectedCell = viewModel.selectedCell.subscribe(value => {
			selectedCell = value;
		});
		
		const unsubNoteMode = viewModel.noteMode.subscribe(value => {
			noteMode = value;
		});
		
		const unsubDigitCounts = viewModel.digitCounts.subscribe(value => {
			digitCounts = value;
		});
		
		return () => {
			unsubBoard();
			unsubNotes();
			unsubSelectedCell();
			unsubNoteMode();
			unsubDigitCounts();
		};
	});

	// Handle keyboard input
	function handleKeydown(event: KeyboardEvent) {
		// Only proceed if key is a number from 1-9
		if (!event.key.match(/[1-9]/)) return;

		const digit = parseInt(event.key, 10) as Digit;
		viewModel.enterDigit(digit);
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

	<PlayBoard 
		{board} 
		{notes} 
		{selectedCell} 
	/>

	<Digits 
		{digitCounts}
	/>

	<Actions 
		{noteMode}
	/>
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
