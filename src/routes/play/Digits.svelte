<script lang="ts">
	import type { Digit } from '$lib/repository';
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import Actions from './Actions.svelte';

	export let digitCounts: number[] = Array(9).fill(0);
	
	let noteMode = false;

	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	function handleDigitClick(digit: number) {
		viewModel.enterDigit(digit as Digit);
	}
	
	function toggleNoteMode() {
		viewModel.toggleNoteMode();
	}

	onMount(() => {
		const unsubNoteMode = viewModel.noteMode.subscribe(value => {
			noteMode = value;
		});

		return () => {
			unsubNoteMode();
		};
	});
</script>

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

	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button class="digit-button note-btn" class:active={noteMode} on:click={toggleNoteMode}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
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
	</button>

	<Actions />
</div>

<style>
	.digits-container {
		display: flex;
		justify-content: center;
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
		font-size: 1.6rem;
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

	.note-btn {
		font-size: 18px;
		background-color: #f3f4f6;
	}
	
	.note-btn:hover {
		background-color: #dbeafe;
		color: #3b82f6;
	}
	
	.note-btn.active {
		background-color: #3b82f6;
		color: white;
	}

	.note-btn.active:hover {
		background-color: #2563eb;
	}
</style>