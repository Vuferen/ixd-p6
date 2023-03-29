<script>
	// This page should show the teacher's classes. If they are not logged in it should redirect to the login page.

	import Button from "../../../lib/Button.svelte";
	import TextInput from "../../../lib/TextInput.svelte";
	import "iconify-icon";
	import Layout from "../../../lib/Layout.svelte";
</script>

<Layout title="Klasseliste">
	<div slot="body" class="body">
		
	</div>
	<!-- <form slot="body" class="body">
		<TextInput type="text">Navn</TextInput>
		<TextInput type="password">Kodeord</TextInput>
		<TextInput type="password">Bekræft Kodeord</TextInput>
		<div class="center">
			<Button type="primary" icon="mdi:chevron-right-circle">Opret bruger</Button>
		</div>
	</form> -->

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle">Tilføj</Button
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
