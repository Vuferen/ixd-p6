<script>
	export let name = "";
	export let code = "";
	export let onclick;
</script>

<div class="classroom" onclick={onclick}>
	<input type="text" bind:value={name}>
	<span>Kode: {code}</span>
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
		height: 100px;
		display: flex;
		flex-direction: column;
		width: auto;
		border-radius: var(--border-radius);
	}
	input{
		font-size: 3rem;
		background: none;
		border: none;
		z-index: 3;
	}
	span {
		font-size: 1.8rem;
	}
</style>