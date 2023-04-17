<script>
	// Siden alle opgaverne kommer på

  	import Exercise from '$lib/Exercise/Exercise.svelte';
	import ExerciseOverview from '$lib/Exercise/ExerciseOverview.svelte';
	import ExerciseAllComplete from '$lib/Exercise/ExerciseAllComplete.svelte';
	import { serialHandler } from '$lib/serial-handler.ts';
  	import { onMount } from 'svelte';


	/** @type {import('./$types').PageData} */  
	export let data;

	let state = 0;
	let exerciseData = [];

	onMount(async () => {
		let {data: assignments} = await data.supabase.rpc('get_assignments_from_code', { param_code: data.code });
		await Promise.all(assignments.map(async element => {
			let {data: answer} = await data.supabase.rpc('get_answer', { param_assignment_id: element.assignment_id });
			let text_answer = convertAnswerToText(answer);
			exerciseData = [...exerciseData, {
				id: element.assignment_id,
				exercise: element.assignment_text, 
				hint: element.assignment_hint, 
				explanation: element.assignment_explanation, 
				answer: text_answer,
				isSelected: false}
			];
		}));
		exerciseData = exerciseData.sort(compareID);
		
	});

	function compareID(a, b) {
		if (a.id < b.id) {
			return -1;
		}
		if (a.id > b.id) {
			return 1;
		}
		return 0;
	}

	function convertAnswerToText(answer) {
		let text = "";
		let positions = [];
		for (let i = answer.length-1; i >= 0; i--) {
			const piece = answer[i];
			if (i == answer.length-1) {
				text += piece.piece_name;
				positions.push(piece.piece_position);
			} else if (positions.includes(piece.piece_position)) {
				text += "/" + piece.piece_name;
			} else {
				text += " -> " + piece.piece_name;
				positions.push(piece.piece_position);
			}
			
		}
		return text;
	}

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
