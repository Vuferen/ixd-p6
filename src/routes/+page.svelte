<script>
	import supabase from "$lib/db";
	async function getData() {
		const { data: pieces, error } = await supabase.from("pieces").select("*");
		if (error) throw new Error(error.message);

		return pieces;
	}
</script>

<h1>The pieces</h1>
{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as piece}
		<li>{piece.name}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
