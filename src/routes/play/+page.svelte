<script lang="ts">
	import PlayScreen from './PlayScreen.svelte';
	import type { Board, Level } from '$lib/parser';
	import type { PageData } from '../$types';

	export let data: { levelId: Level; board: Board } & PageData;
</script>

<PlayScreen levelId={data.levelId} initialBoard={data.board} />
