<script>
	import Layout from "$lib/Layout.svelte";
	import Box from "$lib/Box.svelte";
	import Button from "$lib/Button.svelte";
	import "iconify-icon";

	export let data;
	export let onStart;
	export let onConnect;
</script>

<Layout title="Dagens opgaver">
	<Button slot="top" type="secondary" color="blue2" onclick={onConnect}>Tilslut bræt</Button>
		<Box slot="body">
			<ol >
				{#each data as exercise}
					<li>{exercise.exercise}</li>
				{/each}	
			</ol>
		</Box>
	<Button slot="bottom" type="primary" icon="mdi:chevron-right-circle" onclick={onStart}>Start</Button>
</Layout>

<style>
	ol{
		line-height: 4rem;
		margin: 1em 0;
	}
</style>