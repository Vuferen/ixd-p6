<script>
  	import Box from "$lib/Box.svelte";
	import Layout from "$lib/Layout.svelte";
  	import Button from "../Button.svelte";
  	import ProgressBar from "../ProgressBar.svelte";
  	import "iconify-icon";

	export let data;
	export let exerciseIndex = 0;
	export let onNextExercise;

	let states = {
		start: 0,
		mistake: 1,
		hint: 2,
		success: 3,
		nearSuccess: 4,
	};

	let state = states.start;
	let isSecondAttempt = false;

	// This function should be changed to actually evaluate the state of the board
	function evaluateExercise() {
		if (state == states.hint) {
			state = states.success;
		}
		else if (isSecondAttempt) {
			state = states.nearSuccess;
		} else {
			state++;
			isSecondAttempt = true;
		}
	}

	function goToNextExercise() {
		state = states.start;
		isSecondAttempt = false;
		onNextExercise();
	}

</script>

{#if state == states.start}
	<Layout title="I opgaven skal i:" useBoxTitle=true>
		<Box slot="body" color="green2">
			<span class="center">{data[exerciseIndex].exercise}</span>
		</Box>
		<Button slot="bottom" type="secondary" color="green1" onclick={evaluateExercise}>Aflæs bræt</Button>
	</Layout>
{:else if state == states.mistake}
	<Layout title="I er der næsten!">
		<div slot="body" class="mistake-body">
			<Button slot="bottom" type="primary" color="green1" onclick={() => state = states.hint}>Hjælp til opgaven</Button>
			<Button slot="bottom" type="secondary" color="green2" onclick={() => state = states.start}>Prøv igen uden hjælp</Button>
		</div>
	</Layout>
{:else if state == states.hint}
	<Layout title="Hint!">
		<Box slot="body" color="blue1">
			<span class="center">{data[exerciseIndex].hint}</span>
		</Box>
		<Button slot="bottom" type="secondary" color="green1" onclick={evaluateExercise}>Aflæs bræt</Button>
	</Layout>
{:else if state == states.success}
	<Layout title="Godt klaret!">
		<div slot="body" class="box-and-progress">
			<Box color="blue1">
				<span class="center">{data[exerciseIndex].explanation}</span>
			</Box>
			<div class="progress-bar-container">
				<ProgressBar max={data.length} progress={exerciseIndex+1}/>
			</div>
		</div>
		<Button slot="bottom" type="primary" color="green1" icon="mdi:chevron-right-circle" onclick={goToNextExercise}>Næste opgave</Button>
	</Layout>
{:else if state == states.nearSuccess}
	<Layout title="Tæt på!">
		<div slot="body" class="box-and-progress">
			<Box color="blue1">
				<h2>Rækkefølgen skulle have været:</h2>
				<span class="center">{data[exerciseIndex].explanation}</span>
			</Box>
			<div class="progress-bar-container">
				<ProgressBar max={data.length} progress={exerciseIndex+1}/>
			</div>
		</div>
		<Button slot="bottom" type="primary" color="green1" icon="mdi:chevron-right-circle" onclick={goToNextExercise}>Næste opgave</Button>
	</Layout>
{/if}

<style>
	.center{
		text-align: center;
	}
	.mistake-body{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
	}
	.box-and-progress{
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
	.progress-bar-container {
		width: 80%;
		align-self: center;
	}
	h2 {
		/* font-size: 2rem; */
		text-align: center;
		font-size: 3.6rem;
		font-weight: normal;
	}
</style>