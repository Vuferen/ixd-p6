<script>
	// This page should show the teacher's classes. If they are not logged in it should redirect to the login page.

	import Button from "$lib/Button.svelte";
	import "iconify-icon";
	import Layout from "$lib/Layout.svelte";
	import ClassroomBox from "$lib/ClassroomBox.svelte";

	let classrooms = [];

	export let data;

	// initial load of all classrooms from +page.ts
	$: ({ tableData } = data);
	$: if (data.session) {
		classrooms = tableData;
	}
	

	async function newClassroom(session, supabase) {
		const { data, error } = await supabase
		.from('classrooms')
		.insert([
			{teacher: session.user.id, name: "Ny klasse"},
		]);
		const { data: tableData} = await supabase.from('classrooms').select('id, name, code');
		classrooms = tableData;
	}

	async function updateClassroom(supabase, classroom) {
		const { data, error } = await supabase
		.from('classrooms')
		.update({name: classroom.name})
		.eq('id', classroom.id).select();
	}

</script>

<Layout title="Klasseliste" data={data} showLogOutButton={true}>
	<div slot="body" class="body">
		{#each classrooms as classroom}
			<ClassroomBox bind:name={classroom.name} code={classroom.id} id={classroom.id} onsave={updateClassroom(data.supabase, classroom)}/>
		{/each}
	</div>

	<!-- <form slot="bottom" action="?/createClassroom" method="POST"> -->
		<!-- <button slot="bottom" on:click={() => newClass(data.session, data.supabase)}>Test</button> -->
		<Button
		slot="bottom"
		type="primary"
		color="purple2"
		icon="material-symbols:add-circle"
		onclick={() => newClassroom(data.session, data.supabase)}>Tilføj</Button
	>
	<!-- </form> -->
	
</Layout>

<style>
	.body {
		display: grid;
		grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
		gap: 3em;
		/* padding: 0 15%; */
	}
	.center {
		align-self: center;
	}
</style>
