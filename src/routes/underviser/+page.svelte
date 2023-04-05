<script>
	// This page should show the teacher's classes. If they are not logged in it should redirect to the login page.

	import Button from "$lib/Button.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";

	/** @type {import('./$types').PageData} */  
	export let data;
	console.log(data);

	let userEmail = "";

	$: if (data.session) {
		userEmail = data.session.user.email;
	}


</script>

<Layout title="Klasseliste ({userEmail})">
	<div slot="body" class="body">
		<Button type="classroom" code="123">4. A</Button>
		<Button type="classroom">4. B</Button>
		<Button type="classroom">4. C</Button>
		<Button type="classroom">5. A</Button>
		<Button type="classroom">5. B</Button>
		<Button type="classroom">5. C</Button>
	</div>

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle">Tilføj</Button
	>
</Layout>

<style>
	.body {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 3em;
		/* padding: 0 15%; */
	}
	.center {
		align-self: center;
	}
</style>
