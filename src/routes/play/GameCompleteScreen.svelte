<script lang="ts">
	import { goto } from '$app/navigation';
	import { type Level } from '$lib/parser';
	import { base } from '$app/paths';

	export let levelId: Level;

	function startNewGame() {
		goto(`${base}/`);
	}
</script>

<div class="overlay">
	<div class="complete-card">
		<h2>Puzzle Completed!</h2>
		<p>Congratulations! You've successfully completed the {levelId} puzzle.</p>

		<button class="new-game-btn" on:click={startNewGame}> New Game </button>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		animation: fadeIn 0.3s ease-in-out;
	}

	.complete-card {
		background-color: white;
		border-radius: 12px;
		padding: 24px;
		text-align: center;
		max-width: 400px;
		width: 80%;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		animation: slideIn 0.4s ease-out;
	}

	h2 {
		color: #3b82f6;
		font-size: 24px;
		margin-top: 0;
	}

	p {
		font-size: 16px;
		color: #4b5563;
		margin-bottom: 24px;
	}

	.new-game-btn {
		background-color: #3b82f6;
		color: white;
		font-size: 18px;
		font-weight: bold;
		padding: 12px 28px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.new-game-btn:hover {
		background-color: #2563eb;
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
