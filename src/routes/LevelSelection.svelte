<script lang="ts">
	import { goto } from '$app/navigation';
	import { generator } from '$lib/Generator';
	import { type Level, LEVELS } from '$lib/models';
	import { appUrl } from '$lib/appUrl';
	import DarkModeToggle from '../components/DarkModeToggle.svelte';

	const logo = appUrl('/logo.png');

	const levels = LEVELS.slice(1);

	function selectLevel(levelCode: Level) {
		const board = generator.generateBoardString(levelCode);
		goto(appUrl(`/play?game=${levelCode}${board}`));
	}
</script>

<div class="container">
	<h1>SUDOKU</h1>
	<div class="logo">
		<img src="{logo}" alt="Sudoku Logo" />
	</div>

	<div class="levels-container">
		<h2>Select Level</h2>
		<div class="levels-grid">
			{#each levels as level (level.id)}
				<button
					class="level-card"
					style="background: {level.gradient};"
					on:click={() => selectLevel(level.id)}
				>
					<div class="level-content">
						<span class="level-name">{level.name}</span>
						<span class="level-icons">{level.icon}</span>
					</div>
					<div class="shine"></div>
				</button>
			{/each}
		</div>
	</div>
</div>
<DarkModeToggle />
<style>
    .container {
        display: flex;
				box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        width: 100vw;
				min-height: 100vh;
        padding-top: 24px;
				padding-bottom: 3rem;
        background-color: var(--bg-primary);
        font-family: monospace;
    }

    h1 {
        font-size: 36px;
        font-weight: 800;
        letter-spacing: 4px;
        margin-bottom: 8px;
        color: var(--text-primary);
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .logo {
        width: 80px;
        height: 80px;
        background-color: var(--color-primary);
        color: var(--text-on-primary);
        font-size: 48px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        border: 0.5px solid var(--border-color-strong);
        margin-bottom: 36px;
        box-shadow: var(--shadow-xl);
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;

				img {
						width: calc(100% + 1px);
						height: calc(100% + 1px);
				}
    }

    .logo::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shine 2s infinite;
    }

    @keyframes shine {
        to {
            left: 100%;
        }
    }

    .levels-container {
        width: 100%;
        max-width: 320px;
        background-color: var(--bg-secondary);
        border-radius: 24px;
        padding: 24px;
        box-shadow: var(--shadow-lg);
    }

    h2 {
        font-size: 20px;
        margin-bottom: 20px;
				margin-top: 0;
        color: var(--text-secondary);
        text-align: center;
        font-weight: 600;
    }

    .levels-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    .level-card {
        position: relative;
        border: none;
        border-radius: 12px;
        padding: 0;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        height: 64px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
    }

    .level-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .level-card:active {
        transform: translateY(2px);
    }

    .level-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        height: 100%;
    }

    .level-name {
        font-size: 1.4rem;
        color: white;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        font-family: monospace;
    }

    .level-icons {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: -4px;
    }

    .shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        z-index: 1;
        animation: shine 3s infinite;
        animation-delay: calc(var(--index) * 0.5s);
    }

    .level-card:nth-child(1) .shine {
        --index: 0;
    }

    .level-card:nth-child(2) .shine {
        --index: 1;
    }

    .level-card:nth-child(3) .shine {
        --index: 2;
    }

    .level-card:nth-child(4) .shine {
        --index: 3;
    }
</style>
