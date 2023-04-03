<script>
	import Layout from "$lib/Layout.svelte";
	import Box from "$lib/Box.svelte";
	import Button from "$lib/Button.svelte";
	import ProgressBar from "$lib/ProgressBar.svelte";
	export let onFinish;
</script>

<Layout title="Godt klaret!">
	<div slot="body" class="box-and-progress">
		<Box color="blue1">
			<span class="center">I har nu lavet alle opgaverne for i dag</span>
		</Box>
		<div class="progress-bar-container">
			<ProgressBar max="1" progress="1"/>
		</div>
	</div>
	<Button slot="bottom" type="secondary" color="green1" onclick={onFinish}>Afslut</Button>
</Layout>


<style>
	span {
		text-align: center;
	}
	.box-and-progress{
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
	.progress-bar-container {
		width: 80%;
		align-self: center;
	}
</style>