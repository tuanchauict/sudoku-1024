<script lang="ts">
	import type { Digit } from '$lib/repository';
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import NoteIcon from './NoteIcon.svelte';
	import Tip from './Tip.svelte';

	export let digitCounts: number[] = Array(9).fill(0);

	let noteMode = false;
	let isClearable = true;

	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	function handleDigitClick(digit: number) {
		viewModel.enterDigit(digit as Digit);
	}

	function toggleNoteMode() {
		viewModel.toggleNoteMode();
	}

	onMount(() => {
		const unsubNoteMode = viewModel.noteMode.subscribe((value) => {
			noteMode = value;
		});
		const ubsubEditableCell = viewModel.cellEditable.subscribe((value) => {
			isClearable = value;
		});

		return () => {
			unsubNoteMode();
			ubsubEditableCell();
		};
	});
</script>

<div class="container">
	<div class="digits-container">
		{#each Array(9).fill(null) as _, i}
			{@const digit = i + 1}
			{@const count = digitCounts[i]}
			<button
				class="digit-button"
				class:disabled={count >= 9}
				on:click={() => handleDigitClick(digit)}
				disabled={count >= 9}
			>
				{digit}
			</button>
		{/each}

		<button
			class="digit-button clear-btn"
			disabled={!isClearable}
			on:click={() => viewModel.clearSelectedCell()}
		>
			<span>&#10005;</span>
		</button>
	</div>

	<div class="actions-container">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="action-button note-btn" class:active={noteMode} on:click={toggleNoteMode}>
			<NoteIcon />
			<span>Note</span>
		</button>
	</div>

	<Tip />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 300px;
	}

	.digits-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 8px;
		margin: 8px 0;
		width: 100%;
		max-width: 300px;
	}

	.digit-button {
		width: calc(20% - 8px);
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		color: black;
		font-weight: bold;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		position: relative;
	}

	@media (min-width: 768px) {
		.digits-container {
			gap: 10px;
		}

		.digit-button {
			width: calc(20% - 10px);
			font-size: 20px;
		}
	}

	.digit-button:hover:not(.disabled) {
		background-color: #e0e0e0;
	}

	.digit-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #ddd;
	}

	.clear-btn {
		color: #4b5563;
		font-size: 1.4rem;
	}

	.digit-button.clear-btn:hover {
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

	.actions-container {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin: 8px 4px;
		width: 100%;
	}

	.action-button {
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

	.note-btn {
		font-size: 1rem;
		background-color: #f3f4f6;

		&:hover {
			background-color: #dbeafe;
			color: #3b82f6;
		}

		&.active {
			background-color: #3b82f6;
			color: white;

			&:hover {
				background-color: #2563eb;
			}
		}
	}
</style>
