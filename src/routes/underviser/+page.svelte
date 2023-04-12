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

	let classrooms = [{name: "4.B", code: "test"}];


	// let isAddingNewClass = false;
	// let newClassName = "";
	function newClass() {
		// isAddingNewClass = true;
		classrooms = [...classrooms, {name: "Ny klasse", code: ""}];
	}
	function saveNewClass() {
		// isAddingNewClass = false;
		// if (newClassName != "") {
		// 	classrooms = [...classrooms, {name: newClassName, code: ""}];
		// }
	}


</script>

<Layout title="Klasseliste ({userEmail})">
	<div slot="body" class="body">
		{#each classrooms as classroom}
			<Button type="classroom" code={classroom.code}><input type="text" name="new-class" bind:value={classroom.name}></Button>
		{/each}
		<!-- {#if isAddingNewClass}
			<Button type="classroom" code="" disable={true}><input type="text" name="new-class" bind:value={newClassName} onabort={saveNewClass} autofocus></Button>
		{/if} -->
		<!-- <Button type="classroom" code="123">4. A</Button>
		<Button type="classroom">4. B</Button>
		<Button type="classroom">4. C</Button>
		<Button type="classroom">5. A</Button>
		<Button type="classroom">5. B</Button>
		<Button type="classroom">5. C</Button> -->
	</div>

	<Button
		slot="bottom"
		type="primary"
		color="green2"
		icon="material-symbols:add-circle" onclick={newClass}>Tilføj</Button
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
	input{
		font-size: 3rem;
		background: none;
		border: none;
		z-index: 3;
	}
</style>
