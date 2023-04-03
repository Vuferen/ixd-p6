<script>
	import Button from "$lib/Button.svelte";
  	import Box from "$lib/Box.svelte";
	export let title = "Velkommen";
	export let useBoxTitle = false;
	export let titleBoxColor = "blue1";
	export let showBackButton = false;
</script>

{#if showBackButton}
	<Button type="secondary" color="blue2">Tilbage</Button>
{/if}

<main>
	{#if useBoxTitle}
		<Box color={titleBoxColor}><h1 class="box-title">{title}</h1></Box>
	{:else}
		<h1>{title}</h1>
	{/if}
	<slot name="body"/>
</main>
<div class="bottom">
	<slot name="bottom"/>
</div>

<img class="img-bottom-left" src="/illustrations/Træer.png" alt="" width="33%">
<img class="img-lamp" src="/illustrations/Pære.png" alt="" width="23%">


<style>
	main {
		margin: 0 20%;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	h1 {
		font-family: var(--font);
		text-align: center;
		font-size: 5rem;
	}
	.box-title {
		font-weight: normal;
		font-size: 3rem;
	}
	.bottom{
		display: flex;
		justify-content: right;
		margin-top: auto;
	}
	.img-bottom-left {
		position: absolute;
		left: 100px;
		bottom: 70px;
		z-index: -1;
	}
	.img-lamp{
		position: absolute;
		top: 70px;
		right: 250px;
		z-index: -1;
		transform: rotateZ(20deg);
	}
</style>