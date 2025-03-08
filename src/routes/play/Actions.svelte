<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	
	export let noteMode = false;

	let isClearable = true;
	
	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	onMount(() => {
		const ubsubEditableCell = viewModel.cellEditable.subscribe(value => {
			isClearable = value;
		});

		return ubsubEditableCell;
	});

	function toggleNoteMode() {
		viewModel.toggleNoteMode();
	}

	function clearCell() {
		viewModel.clearSelectedCell();
	}
</script>

<div class="actions-container">
	<button class="action-btn note-btn" class:active={noteMode} on:click={toggleNoteMode}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
		</svg>
		<span>Notes</span>
	</button>

	<button 
		class="action-btn clear-btn"
		disabled={!isClearable}
		on:click={clearCell}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M18 6L6 18"></path>
			<path d="M6 6l12 12"></path>
		</svg>
		<span>Clear</span>
	</button>
</div>

<style>
	.actions-container {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin: 16px 0;
		width: 100%;
	}

	.action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f3f4f6;
		border: none;
		border-radius: 8px;
		padding: 12px 24px;
		cursor: pointer;
		transition: all 0.2s;
		color: #4b5563;
		width: 80px;
		height: 80px;
	}

	.action-btn svg {
		margin-bottom: 8px;
	}

	.action-btn span {
		font-size: 14px;
		font-weight: 500;
	}

	.note-btn:hover {
		background-color: #dbeafe;
		color: #3b82f6;
	}

	.note-btn.active {
		background-color: #3b82f6;
		color: white;
	}

	.clear-btn:hover {
		background-color: #fee2e2;
		color: #ef4444;
	}

	.clear-btn:active {
		background-color: #fecaca;
	}

	.clear-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
