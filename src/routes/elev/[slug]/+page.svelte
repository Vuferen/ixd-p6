<script>
	// Siden alle opgaverne kommer på

  	import Exercise from '$lib/Exercise/Exercise.svelte';
	import ExerciseOverview from '$lib/Exercise/ExerciseOverview.svelte';
	import ExerciseAllComplete from '$lib/Exercise/ExerciseAllComplete.svelte';
	import { serialHandler } from '$lib/serial-handler.ts';
  	import { onMount } from 'svelte';
	import { getAssignmentsFromClassroomId, getAssignmentsFromCode } from '$lib/Exercise/assignmentTools.js';


	/** @type {import('./$types').PageData} */  
	export let data;

	let state = 0;
	let exerciseData = [];

	onMount(async () => {
		exerciseData = await getAssignmentsFromClassroomId(data.supabase, data.code);
	});

	async function connectPort() {
		await serialHandler.init();
		await serialHandler.read(); // wait for arduino to be ready
		serialHandler.write("0\n"); // turn lights off
	}

</script>

{#if state == 0}
	<ExerciseOverview data = {exerciseData} onStart={() => state++} onConnect={connectPort}/>
{:else if state <= exerciseData.length}
	<Exercise data={data} assignmentData={exerciseData} exerciseIndex={state-1} onNextExercise={() => state++} {serialHandler}/>
{:else}
	<ExerciseAllComplete onFinish={() => state = 0}/>
{/if}
