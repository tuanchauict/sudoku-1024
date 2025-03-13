<script lang="ts">
	import { goto } from '$app/navigation';
	import { appUrl } from '$lib/appUrl';
	import { type Level, LEVELS } from '$lib/models';

	export let levelId: Level;

	function startNewGame() {
		goto(appUrl('/'));
	}
</script>

<svelte:head>
	<title>Sudoku 1024: {LEVELS[levelId].name} Complete</title>
</svelte:head>

<div class="overlay">
	<div class="complete-card">
		<h2>Puzzle Completed!</h2>
		<p>Congratulations! You've successfully completed the {LEVELS[levelId].name} puzzle.</p>

		<button class="new-game-btn" on:click={startNewGame}> New Game</button>
	</div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--overlay-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        animation: fadeIn 0.3s ease-in-out;
    }

    .complete-card {
        background-color: var(--bg-secondary);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        max-width: 400px;
        width: 80%;
        box-shadow: var(--shadow-game-card);
        animation: slideIn 0.4s ease-out;
    }

    h2 {
        color: var(--color-primary);
        font-size: 24px;
        margin-top: 0;
        font-family: monospace;
    }

    p {
        font-size: 16px;
        color: var(--text-secondary);
        margin-bottom: 24px;
        line-height: 1.5;
        font-family: monospace;
    }

    .new-game-btn {
        background-color: var(--color-primary);
        color: var(--text-on-primary);
        font-size: 18px;
        font-weight: bold;
        padding: 12px 28px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
        font-family: monospace;

        &:hover {
            background-color: var(--color-secondary);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
