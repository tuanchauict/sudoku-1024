<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	export let levelId: string;

	let timePass = 0;

	const viewModel = getSudokuViewModel();

	function goBack() {
		goto(`${base}/`);
	}

	function clearBoard() {
		viewModel.clearBoard();
	}

	onMount(() => {
		const interval = setInterval(() => {
			timePass++;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: readableTime = new Date(timePass * 1000).toISOString().substr(11, 8);
</script>

<div class="header">
	<button class="back-btn" on:click={goBack}> Back </button>
	<div class="title">
		<h1>{levelId}</h1>
		<h2>{readableTime}</h2>
	</div>
	<button class="clear-btn" on:click={clearBoard}> Clear </button>
</div>



<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		margin-bottom: 12px;
		position: relative;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-grow: 1;
	}

	h1 {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
		margin: 10px 0 0;
	}

	h2 {
		font-size: 0.8rem;
		font-weight: normal;
		color: #888;
		margin: 2px 0 0;
	}

	.back-btn,
	.clear-btn {
		background-color: transparent;
		border: none;
		font-size: 16px;
		color: #3b82f6;
		cursor: pointer;
		padding: 8px;
		left: 0;
	}

</style>
