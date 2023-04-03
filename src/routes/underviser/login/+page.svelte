<script>
	// The login page for teachers

	import Button from "$lib/Button.svelte";
	import TextInput from "$lib/TextInput.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";
</script>

<Layout title="Lærer login" showBackButton=true>
	<form slot="body" class="body">
		<TextInput type="text">Navn</TextInput>
		<TextInput type="password">Kodeord</TextInput>
		<div class="center">
			<Button type="primary" icon="mdi:chevron-right-circle">Log ind</Button>
		</div>
	</form>

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle">Opret bruger</Button
	>
</Layout>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: 3em;
		padding: 0 15%;
	}
	.center {
		align-self: center;
	}
</style>
