<script>
	import Layout from "$lib/Layout.svelte";
  	import TextInput from "$lib/TextInput.svelte";
  	import Button from "$lib/Button.svelte";
	import "iconify-icon";
</script>

<Layout title="Velkommen">
	<div slot="body">
		<TextInput>Indtast klassen kode</TextInput>
		<Button type="primary" color="green1" icon="mdi:chevron-right-circle">Log ind</Button>
	</div>
	<Button slot="bottom" type="secondary" color="green2" >Log ind som lærer</Button>
</Layout>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
	}
</style>