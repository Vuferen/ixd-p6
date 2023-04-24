<script>
	// Skal have en lille og stor version (spørgsmål, svar, hint, beskrivelse)
	export let color = "blue1";
	export let useMinHeight = false;
</script>

<div class="{color} {useMinHeight ? 'use-min-height' : ''}">
	<slot/>
</div>

<style>
	div {
		box-shadow: var(--shadow);
		padding: 1em;
		border-radius: var(--border-radius);
		font-size: 3rem;
		display: flex;
		flex-direction: column;
	}
	.blue1{
		background-color: var(--blue-1);
	}
	.green2{
		background-color: var(--green-2);
	}
	.use-min-height{
		min-height: 200px;
		justify-content: space-evenly;
	}
</style>