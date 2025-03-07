<script lang="ts">
	import PlayScreen from './PlayScreen.svelte';
	import type { Level } from '$lib/repository';

	export let levelId: Level;
    console.log('Page:', levelId);
</script>

<PlayScreen {levelId} />