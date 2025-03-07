<script lang="ts">
	import PlayScreen from './PlayScreen.svelte';
	import type { Level } from '$lib/repository';
	import type { PageData } from '../$types';
	import Board from './PlayBoard.svelte';

    export let data: { levelId: Level, board: Board } & PageData;
</script>

<PlayScreen levelId={data.levelId} initialBoard={data.board}/>