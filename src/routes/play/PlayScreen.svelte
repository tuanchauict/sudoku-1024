<script lang="ts">
	import PlayBoard from './PlayBoard.svelte';
	import Digits from './Digits.svelte';
	import type { Board, Level, Digit } from '$lib/repository';
	import { SudokuViewModel } from '$lib/SudokuViewModel';
	import { onMount } from 'svelte';
	import { setSudokuViewModel } from '$lib/sudokuContext';
	import GameCompleteScreen from './GameCompleteScreen.svelte';
	import Header from './Header.svelte';

	export let levelId: Level;
	export let initialBoard: Board;

	// Create the view model and set it in context
	const viewModel = new SudokuViewModel(levelId, initialBoard);
	setSudokuViewModel(viewModel);

	// Create reactive variables from stores
	let board: Board = [];
	let notes: boolean[][][] = [];
	let selectedCell = { row: -1, col: -1 };
	let digitCounts = Array(9).fill(0);
	let gameComplete = false;

	// State for responsive layout
	let isWideLayout = false;
	let windowWidth = 0;
	let windowHeight = 0;

	// Subscribe to stores from the viewModel
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

		const unsubDigitCounts = viewModel.digitCounts.subscribe((value) => {
			digitCounts = value;
		});

		const unsubGameComplete = viewModel.gameComplete.subscribe((value) => {
			gameComplete = value;
		});

		return () => {
			unsubBoard();
			unsubNotes();
			unsubSelectedCell();
			unsubDigitCounts();
			unsubGameComplete();
		};
	});

	// Update layout based on window dimensions
	$: isWideLayout = windowWidth > windowHeight;
	$: isSquareLayout = windowHeight > 0 && !isWideLayout && windowWidth / windowHeight > 0.65;
	$: console.log(windowWidth, windowHeight, windowWidth > windowHeight, windowWidth / windowHeight);

	function moveSelection(offsetRow: number, offsetCol: number) {
		if (selectedCell.row === -1 || selectedCell.col === -1) {
			selectedCell.row = 0;
			selectedCell.col = 0;
		} else {
			selectedCell.row += offsetRow;
			selectedCell.col += offsetCol;
		}

		if (selectedCell.row < 0) selectedCell.row = 0;
		if (selectedCell.row > 8) selectedCell.row = 8;
		if (selectedCell.col < 0) selectedCell.col = 0;
		if (selectedCell.col > 8) selectedCell.col = 8;

		viewModel.selectCell(selectedCell.row, selectedCell.col);
	}

	// Handle keyboard input
	function handleKeydown(event: KeyboardEvent) {
		if (gameComplete) {
			return;
		}

		// Only proceed if key is a number from 1-9
		if (event.key.match(/[1-9]/)) {
			const digit = parseInt(event.key, 10) as Digit;
			viewModel.enterDigit(digit);
		} else if (event.key === 'Backspace') {
			viewModel.clearSelectedCell();
		} else if (event.key === 'Enter') {
			viewModel.toggleNoteMode();
		} else if (event.key === 'ArrowUp') {
			moveSelection(-1, 0);
		} else if (event.key === 'ArrowDown') {
			moveSelection(1, 0);
		} else if (event.key === 'ArrowLeft') {
			moveSelection(0, -1);
		} else if (event.key === 'ArrowRight') {
			moveSelection(0, 1);
		}
	}
</script>

<svelte:window
	on:keydown={handleKeydown}
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
/>

<div class="container" class:wide-layout={isWideLayout}>
	<Header {levelId} />

	<div class="game-content" class:wide-layout={isWideLayout}>
		<div class="board-container" class:square-layout={isSquareLayout}>
			<PlayBoard {board} {notes} {selectedCell} />
		</div>

		<div class="controls-container">
			<Digits {digitCounts} />
		</div>
	</div>

	{#if gameComplete}
		<GameCompleteScreen {levelId} />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12px;
		font-family: Arial, sans-serif;
		max-width: 100%;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;

		&.wide-layout {
			max-width: 900px;
		}
	}

	.game-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		gap: 16px;

		&.wide-layout {
			flex-direction: row;
		}
	}

	.board-container {
		width: 100%;

		&.square-layout {
			max-width: min(100vh - 330px, 80vmin);
		}
	}

	.wide-layout .board-container {
		width: 65%;
		max-width: 75vmin;
	}

	.controls-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.wide-layout .controls-container {
		width: 35%;
		padding-left: 16px;
	}

	@media (max-width: 600px) {
		.container {
			padding: 8px;
		}

		.game-content {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
