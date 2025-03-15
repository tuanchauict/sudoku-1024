<script lang="ts">
	import { goto } from '$app/navigation';
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import { type Level, LEVELS } from '$lib/models';
	import { appUrl } from '$lib/appUrl';

	export let levelId: Level;

	const viewModel = getSudokuViewModel();

	let timePass = 0;
	let gameComplete = false;

	function goBack() {
		goto(appUrl('/'));
	}

	function clearBoard() {
		viewModel.clearBoard();
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (!gameComplete) {
				timePass++;
			}
		}, 1000);

		const unsubTime = viewModel.timePass.subscribe((value) => {
			timePass = value;
		});

		const unsubGameComplete = viewModel.gameComplete.subscribe((value) => {
			gameComplete = value;
		});

		return () => {
			clearInterval(interval);
			unsubTime();
			unsubGameComplete();
		};
	});

	$: readableTime = new Date(timePass * 1000).toISOString().substr(11, 8);
</script>

<div class="header">
	<button class="back-btn" on:click={goBack}>Back</button>
	<div class="title">
		<h1>{LEVELS[levelId].name}</h1>
		<h2>{readableTime}</h2>
	</div>
	<button class="clear-btn" on:click={clearBoard}>Reset</button>
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
        font-family: monospace;
    }

    h1 {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        margin: 10px 0 0;
        color: var(--text-primary);
    }

    h2 {
        font-size: 0.8rem;
        font-weight: normal;
        color: var(--text-tertiary);
        margin: 2px 0 0;
    }

    .back-btn,
    .clear-btn {
        background-color: transparent;
        border: none;
        font-size: 16px;
        color: var(--color-primary);
        cursor: pointer;
        padding: 8px;
        left: 0;

				&:hover {
            color: var(--color-secondary);
				}
    }
</style>
