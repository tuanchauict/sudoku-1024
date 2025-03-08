<script lang="ts">
	import type { Digit } from '$lib/repository';
	import { getSudokuViewModel } from '$lib/sudokuContext';

	export let digitCounts: number[] = Array(9).fill(0);

	// Get the ViewModel from context
	const viewModel = getSudokuViewModel();

	function handleDigitClick(digit: number) {
		viewModel.enterDigit(digit as Digit);
	}
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
</div>

<style>
	.digits-container {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin: 16px 0;
	}

	.digit-button {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: bold;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		position: relative;
	}

	.digit-button:hover:not(.disabled) {
		background-color: #e0e0e0;
	}

	.digit-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #ddd;
	}
</style>
