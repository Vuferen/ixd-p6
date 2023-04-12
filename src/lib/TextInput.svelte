<script>
	// Skal have en label med et input felt under
	// Skal kunne sættes til enten tekst eller password
	export let type = "text";
	export let name = "";
	export let value = "";
	export let error;
</script>

<label for={name}>
	<slot/>
	{#if type == "text"}
		<input type="text" name={name} bind:value {...$$restProps}>
	{:else if type == "password"}
		<input type="password" name={name} bind:value {...$$restProps}>
	{:else if type == "email"}
		<input type="email" name={name} bind:value {...$$restProps}>
	{/if}
	{#if error}<span class="error">{error}</span>{/if}
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
	.error{
		font-weight: bold;
		font-size: 1.2rem;
	}
</style>