<script>
	// This page should show the teacher's classes. If they are not logged in it should redirect to the login page.

	import Button from "$lib/Button.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";
	import ClassroomBox from "$lib/ClassroomBox.svelte";

	let classrooms = [];
	export let data;
	$: ({ user, tableData } = data);
	$: if (data.session) {
		console.log(tableData);
		console.log(user);
		classrooms = tableData;
	}

	function newClass() {
		if (data.session) {
			classrooms = [...classrooms, { name: "Ny klasse", code: "" }];
		}
	}
</script>

<Layout title="Klasseliste ({user.email})">
	<div slot="body" class="body">
		{#each classrooms as classroom}
			<ClassroomBox bind:name={classroom.name} code={classroom.code} />
		{/each}
	</div>

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle"
		onclick={newClass}>Tilføj</Button
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
