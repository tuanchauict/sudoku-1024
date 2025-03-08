<script lang="ts">
	import { prepareDataPool } from '$lib/repository';
	import LevelSelection from './LevelSelection.svelte';

	prepareDataPool();

  setInterval(() => {
    prepareDataPool();
  }, 1000);
</script>

<LevelSelection />
