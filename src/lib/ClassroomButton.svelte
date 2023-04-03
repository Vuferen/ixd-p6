<script>
	// Skal have navnet på klassen og evt. koden
	export let code = "";
</script>

<button>
	<slot/>
	{#if code != ""}
		<span>Kode: {code}</span>
	{/if}
</button>

<style>
	button {
		font-family: var(--font);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		border: 3px solid transparent;
		box-sizing: border-box;
		background-color: var(--green-1);
		font-size: 3em;
		text-align: left;
		padding: 0.2em 0.4em;
		height: 100px;
		display: flex;
		flex-direction: column;
	}
	span {
		font-size: 1.8rem;
	}
</style>