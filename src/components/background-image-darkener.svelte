<script lang="ts">
	import { onMount } from 'svelte';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

<div class="background-image-darkener" data-loaded={loaded}></div>

<style>
	.background-image-darkener {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
		transition: filter 2s ease-in-out;
		filter: opacity(0);
	}

	.background-image-darkener[data-loaded='true'] {
		filter: opacity(1);
	}
</style>
