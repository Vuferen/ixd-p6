<script>
	// Den specifikke klasses side (valg af opgave)

	import Layout from '$lib/Layout.svelte';
	import ExerciseList from '$lib/ExerciseList.svelte';
	import Box from '$lib/Box.svelte';
	import Button from '$lib/Button.svelte';
	import { onMount } from 'svelte';
	import { getAssignmentsFromClassroomId } from '$lib/Exercise/assignmentTools.js';

	/** @type {import('./$types').PageData} */  
	export let data;

	let exerciseData = [];

	onMount(async () => {
		exerciseData = await getAssignmentsFromClassroomId(data.supabase, data.id);
	});


</script>

<Layout title="Vælg næste lektions opgaver">
	<div slot="body">
		<Box>
			<ExerciseList bind:data={exerciseData}/>
		</Box>
	</div>
	<Button slot="bottom" type="secondary">Godkend</Button>
</Layout>