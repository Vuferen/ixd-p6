<script>
	import Button from "$lib/Button.svelte";
	import Box from "$lib/Box.svelte";
	import { goto } from "$app/navigation";
	export let title = "Velkommen";
	export let useBoxTitle = false;
	export let titleBoxColor = "blue1";
	export let showBackButton = false;
	export let showLogOutButton = false;
	export let showBackgroundImg = false;
	export let backgroundImg = "default";
	export let data;

	async function logout(data) {
		await data.supabase.auth.signOut(data.session);
		window.location.href = "/";
	}
</script>

{#if showBackButton}
	<Button type="secondary" color="blue2" onclick={() => history.back()}
		>Tilbage</Button
	>
{/if}

{#if showLogOutButton && data.session}
	<Button type="secondary" color="blue2" onclick={() => logout(data)}
		>Log ud</Button
	>
{/if}

<slot name="top" />

<main>
	{#if useBoxTitle}
		<Box color={titleBoxColor}><h1 class="box-title">{title}</h1></Box>
	{:else}
		<h1>{title}</h1>
	{/if}
	<slot name="body" />
</main>
<div class="bottom">
	<slot name="bottom" />
</div>

{#if showBackgroundImg}
	{#if backgroundImg == "default"}
		<img
			class="img img-bottom-left"
			src="/illustrations/Træer.png"
			alt=""
			width="33%"
		/>
		<img
			class="img img-lamp"
			src="/illustrations/Pære.png"
			alt=""
			width="23%"
		/>
	{:else if backgroundImg == "globe"}
		<img
			class="img img-bottom-left"
			src="/illustrations/Verden.png"
			alt=""
			width="33%"
		/>
	{:else if backgroundImg == "coal"}
		<img
			class="img img-bottom-left"
			src="/illustrations/Kul.png"
			alt=""
			width="33%"
		/>
	{:else if backgroundImg == "train"}
		<img
			class="img img-train"
			src="/illustrations/Tog.png"
			alt=""
			width="100%"
		/>
	{:else if backgroundImg == "train-2"}
		<img
			class="img img-train"
			src="/illustrations/Tog-2.png"
			alt=""
			width="70%"
		/>
	{:else if backgroundImg == "lamp"}
		<img
			class="img img-lamp-2"
			src="/illustrations/Pære.png"
			alt=""
			width="23%"
		/>
	{:else if backgroundImg == "pie-chart"}
		<img
			class="img img-pie-chart"
			src="/illustrations/Cirkeldiagram.png"
			alt=""
			width="23%"
		/>
	{/if}
{/if}

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
	.bottom {
		display: flex;
		justify-content: right;
		margin-top: auto;
	}
	.img {
		position: absolute;
		z-index: -1;
	}
	.img-bottom-left {
		left: 100px;
		bottom: 70px;
	}
	.img-lamp {
		top: 70px;
		right: 250px;
		transform: rotateZ(20deg);
	}
	.img-train {
		left: 0;
		bottom: 70px;
	}
	.img-lamp-2 {
		top: 70px;
		right: 250px;
	}
	.img-pie-chart{
		top: 270px;
		right: 100px;
	}
</style>
