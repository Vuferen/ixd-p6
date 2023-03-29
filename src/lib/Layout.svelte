<script>
	import Button from "$lib/Button.svelte";
	export let title = "Velkommen";
</script>

<Button type="secondary" color="blue2">Tilbage</Button>

<main>
	<h1>{title}</h1>
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
	}
	h1 {
		font-family: var(--font);
		text-align: center;
		font-size: 5rem;
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