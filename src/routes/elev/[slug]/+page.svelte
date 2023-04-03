<script>
	// Siden alle opgaverne kommer på

  	import Exercise from '$lib/Exercise/Exercise.svelte';
	import ExerciseOverview from '$lib/Exercise/ExerciseOverview.svelte';
	import ExerciseAllComplete from '$lib/Exercise/ExerciseAllComplete.svelte';


	/** @type {import('./$types').PageData} */  
	export let data;

	let state = 0;

	let exerciseData = [
		{
			exercise: "Make cheese",
			hint: "Use milk",
			explanation: "Ferment the milk",
			isSelected: false 
		},
		{
			exercise: "Paint things",
			hint: "Dont use ms paint",
			explanation: "Use brush",
			isSelected: false 
		},
	]

</script>

{#if state == 0}
	<ExerciseOverview data = {exerciseData} onStart={() => state++}/>
{:else if state <= exerciseData.length}
	<Exercise data={exerciseData} exerciseIndex={state-1} onNextExercise={() => state++}/>
{:else}
	<ExerciseAllComplete onFinish={() => state = 0}/>
{/if}
