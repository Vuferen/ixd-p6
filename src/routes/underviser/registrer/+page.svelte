<script>
	// The register page for teachers
	import Button from "$lib/Button.svelte";
	import TextInput from "$lib/TextInput.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";

	/** @type {import('./$types').PageData} */  
	export let data;

	/** @type {import('./$types').ActionData} */  
	export let form;
	// import { PageData } from './$types';

	//export let data;


	// async function register() {
	// 	let { data, error } = await data.supabase.auth.signUp({
	// 		email: 'someone@email.com',
	// 		password: 'AmbjbEBAXCHoWLBVpgXC'
	// 	})
	// }

</script>

<Layout title="Opret bruger" showBackButton=true>
	<form slot="body" class="body" method="POST" action="?/register">
		<TextInput type="email" name="email">Email</TextInput>
		<TextInput type="password" name="password">Kodeord</TextInput>
		<TextInput type="password" name="confirm-password">Bekræft Kodeord</TextInput>
		<div class="center">
			<Button type="primary" icon="mdi:chevron-right-circle">Opret bruger</Button>
		</div>
	</form>

	<!-- <Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle">Opret bruger</Button
	> -->
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
