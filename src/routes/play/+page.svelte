<script lang="ts">
	import PlayScreen from './PlayScreen.svelte';
	import type { PageData } from '../$types';
	import { type Board, type Level, LEVELS } from '$lib/models';
	import DarkModeToggle from '../../components/DarkModeToggle.svelte';

	export let data: { levelId: Level; board: Board } & PageData;
</script>

<svelte:head>
	<title>Sudoku 1024: {LEVELS[data.levelId].name}</title>
</svelte:head>

<PlayScreen levelId={data.levelId} initialBoard={data.board} />
<DarkModeToggle isVisible="{false}" />