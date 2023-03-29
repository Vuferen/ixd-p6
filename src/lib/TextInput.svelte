<script>
	// Skal have en label med et input felt under
	// Skal kunne sættes til enten tekst eller password
	export let type = "";
	export let name = "";
</script>

<label for={name}>
	<slot/>
	<input type={type} name={name}>
</label>

<style>
	input {
		background-color: var(--text-input-bg);
		padding: 1em;
		border-radius: var(--border-radius);
		outline: none;
		width: 100%;
		box-sizing: border-box;
		border: none;
		font-size: 2rem;
		margin-top: 0.5em;
		box-shadow: var(--shadow);
	}
	label {
		font-family: var(--font);
		font-size: 2.5rem;
	}
</style>