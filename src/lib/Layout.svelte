<script>
	import Button from "$lib/Button.svelte";
  	import Box from "$lib/Box.svelte";
  	import { goto } from "$app/navigation";
	export let title = "Velkommen";
	export let useBoxTitle = false;
	export let titleBoxColor = "blue1";
	export let showBackButton = false;
	export let showLogOutButton = false;
	export let data;

	async function logout(data) {
		await data.supabase.auth.signOut(data.session);
		window.location.href = "/";
	}

</script>

{#if showBackButton}
	<Button type="secondary" color="blue2" onclick={() => history.back()}>Tilbage</Button>
{/if}

{#if showLogOutButton && data.session}
	<Button type="secondary" color="blue2" onclick={() => logout(data)}>Log ud</Button>
{/if}

<slot name="top"/>

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