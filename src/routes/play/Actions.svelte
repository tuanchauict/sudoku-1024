<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	
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
		margin: 16px 4px;
		width: 100%;
	}

	.action-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #f3f4f6;
		border: none;
		border-radius: 8px;
		padding: 12px 24px;
		gap: 8px;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.2s;
		color: #4b5563;
		width: 100%;
	}

	.action-btn span {
		font-size: 14px;
		font-weight: 500;
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
