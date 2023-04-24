<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	export let name = "";
	export let code = "";
	export let id = "";
	// export let onclick;
	export let onsave;

	let editing = false;
	console.log("here");

	function onFocusOut() {
		console.log(editing)
		if (editing) {
			onsave();
			editing = false;	
		}
	}
	
</script>

<div class="classroom">
	<input type="text" bind:value={name} on:focusout={onFocusOut} on:click={() => editing = true}>
	<span>Kode: {code}</span>
	<Button type="secondary" color="blue2" href="underviser/klasse/{id}" >Se opgaver</Button>
</div>

<!-- <button class="classroom" on:click={onclick} disabled={disable}>
	<slot/>
	{#if code != ""}
		<span>Kode: {code}</span>
	{/if}
</button> -->

<style>
	.classroom{
		background-color: var(--green-1);
		font-size: 3rem;
		text-align: left;
		padding: 0.2em 0.4em;
		height: 150px;
		display: flex;
		flex-direction: column;
		width: auto;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
	}
	input{
		font-size: 3rem;
		background: none;
		border: none;
		z-index: 3;
	}
	span {
		font-size: 1.8rem;
		margin-bottom: 15px;
	}
</style>