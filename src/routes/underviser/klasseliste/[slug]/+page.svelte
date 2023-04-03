<script>
	// Den specifikke klasses side (valg af opgave)

  import Layout from '$lib/Layout.svelte';
  import ExerciseList from '$lib/ExerciseList.svelte';
  import Box from '$lib/Box.svelte';
  import Button from '$lib/Button.svelte';

	/** @type {import('./$types').PageData} */  
	export let data;

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

<Layout title="Vælg næste lektions opgaver">
	<div slot="body">
		<Box>
			<ExerciseList data={exerciseData}/>
		</Box>
	</div>
	<Button slot="bottom" type="secondary">Godkend</Button>
</Layout>