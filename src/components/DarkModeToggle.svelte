<script>
	import { onMount } from 'svelte';

	// Set false if you want to apply dark mode without the UI toggle
	export let isVisible = false;

	let darkMode = false;

	// Function to toggle dark mode
	function toggleDarkMode() {
		darkMode = !darkMode;

		if (darkMode) {
			document.documentElement.classList.add('dark-mode');
			localStorage.setItem('darkMode', 'enabled');
		} else {
			document.documentElement.classList.remove('dark-mode');
			localStorage.setItem('darkMode', 'disabled');
		}
	}

	// Initialize based on saved preference
	onMount(() => {
		// Check localStorage
		const savedDarkMode = localStorage.getItem('darkMode');

		// Check for user OS preference if no saved setting
		const prefersDark = window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedDarkMode === 'enabled' || (savedDarkMode === null && prefersDark)) {
			darkMode = true;
			document.documentElement.classList.add('dark-mode');
		}

		// Listen for OS theme changes
		window.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				if (localStorage.getItem('darkMode') === null) {
					darkMode = e.matches;
					document.documentElement.classList.toggle('dark-mode', darkMode);
				}
			});
	});
</script>

{#if isVisible}
	<button
		class="theme-toggle"
		on:click={toggleDarkMode}
		aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
	>
		{#if darkMode}
			<!-- Sun icon for light mode -->
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
					 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="5"></circle>
				<line x1="12" y1="1" x2="12" y2="3"></line>
				<line x1="12" y1="21" x2="12" y2="23"></line>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
				<line x1="1" y1="12" x2="3" y2="12"></line>
				<line x1="21" y1="12" x2="23" y2="12"></line>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
			</svg>
		{:else}
			<!-- Moon icon for dark mode -->
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
					 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		{/if}
	</button>
{/if}

<style>
    .theme-toggle {
        position: fixed;
        top: 14px;
        right: 14px;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        box-shadow: var(--shadow-sm);
        padding: 0;
        transition: background-color 0.3s, color 0.3s, transform 0.2s;
    }

    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-md);
    }

    .theme-toggle:active {
        transform: scale(0.95);
    }
</style>