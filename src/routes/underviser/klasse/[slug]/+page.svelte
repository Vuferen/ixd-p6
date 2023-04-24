<script>
	// Den specifikke klasses side (valg af opgave)

	import Layout from "$lib/Layout.svelte";
	import ExerciseList from "$lib/ExerciseList.svelte";
	import Box from "$lib/Box.svelte";
	import Button from "$lib/Button.svelte";
	import { onMount } from "svelte";
	import { getAssignmentsFromClassroomId } from "$lib/Exercise/assignmentTools.js";

	/** @type {import('./$types').PageData} */
	export let data;

	let exerciseData = [];

	onMount(async () => {
		exerciseData = await getAssignmentsFromClassroomId(data.supabase, data.id);
	});
	let isExerciseDataChanged = false;
	let isGenerating = false;

	async function generateAssignments() {
		if (isGenerating) {
			return;
		}
		isGenerating = true;

		let previousAssignmentData = `
		Eleverne har førhen fået følgende opgaver:

		Opgave: Varmekraftværket er ikke samlet og derfor får huset ikke noget strøm. Brug de store brikker til at samle varmekraftsværket, så beboerne kan få strøm igen. Husk at huset skal bruges som slut brik!
		Hint: Generatoren kommer efter Turbinen.

		Opgave: Varmekraftværket er nu samlet, men der mangler stadig noget. Brug de små brikker til at få brændstoffet lavet om til strøm og ud til huset.
		Hint: De små brikker skal sidde mellem de store brikker.

		Opgave: Prøv at skifte den brændstof brik I har valgt ud med en anden brændstof brik og se hvad der sker.
		Hint: Tjek om I har husket at skifte jeres brændstof brik ud, uden at ændre på de andre brikker.

		`

		let message = [
			{
				role: "user",
				content: previousAssignmentData + `
			Givet følgende store brikker: Hus, Generator, Turbine, Kedel, Kul, Naturgas, Olie, Solpaneler, Vindmølle, Gearkasse, Transformator, Inverter, Elektrisk kredsløb, Batteri, Dæmning.
			Givet følgende små brikker som beskriver processen mellem to store brikker: Ild (Forbrænding), Damp, Rotationsenergi, Elmast

			Lav tre opgaver, lignende de forrige (men uden at kopiere dem) om at sætte nogle af dem sammen i rigtig rækkefølge. Opgaven skal kunne forstås af børn, hjælpe dem med at forbedre de forrige fejl de lavede. Opgaven må ikke indeholde rækkefølgen af brikkerne og skal skrives som:
			Opgave: …
			Der skal være et svar til skrevet som:
			Svar: brik -> brik -> brik…
			Og et hint skrevet som:
			Hint: …
			Og en forklaring skrevet som:
			Forklaring: …
		`,
			},
		];

		const response = await fetch("/api/chatgpt", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: message,
			}),
		});

		console.log("Edge function returned.");

		const data = response.body;
		if (!data) {
			return;
		}

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		let lastMessage = "";

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);

			lastMessage = lastMessage + chunkValue;
		}

		// const response = await fetch('/api/chatgpt', {
		// 	method: 'POST',
		// 	body: JSON.stringify(message),
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// });

		// console.log(response);
		// if (response.status == 200) {
		// 	let res = await response.json();
		// 	console.log(res);
		// }

		exerciseData = splitGPTTextIntoAssignments(lastMessage);
		isExerciseDataChanged = true;
		isGenerating = false;
	}

	// async function generateAssignments() {
	// 	exerciseData = splitGPTTextIntoAssignments("Opgave 1: Hvordan laver man strøm fra solen?\n\t\t\tOpgave: Hvordan kan man bruge solen til at lave strøm, så man kan tænde en lampe?\n\t\t\tSvar: Solpaneler -> Inverter -> Batteri -> Elmast\n\t\t\tHint: Solens stråler går ind i solpanelerne, som omdanner dem til strøm\n\t\t\tForklaring: Solpanelerne fanger solens stråler og omdanner dem til energi. Inverteren sørger for at gøre strømmen klar til at blive brugt i en elmast. Batteriet sørger for at lagre strømmen, så man kan tænde lampen, når solen ikke skinner.\n\nOpgave 2: Hvordan laver man el fra vand?\n\t\t\tOpgave: Hvordan kan man bruge vand til at lave strøm, så man kan tænde en computer?\n\t\t\tSvar: Dæmning -> Turbine -> Generator -> Inverter -> Elmast\n\t\t\tHint: Vandet presser på turbinen og fanger dens rotationsenergi til at lave strøm\n\t\t\tForklaring: Vandet i en dæmning presser på turbinen, som omdanner det til rotationsenergi. Generatoren bruger denne energi til at lave strøm. Inverteren sørger for at gøre strømmen klar til at blive brugt i en elmast, så man kan tænde sin computer.\n\nOpgave 3: Hvordan laver man el fra vind?\n\t\t\tOpgave: Hvordan kan man bruge vinden til at lave strøm, så man kan tænde en ventilator?\n\t\t\tSvar: Vindmølle -> Gearkasse -> Generator -> Inverter -> Elmast\n\t\t\tHint: Vindmøllen bruger vindens rotationsenergi til at lave strøm\n\t\t\tForklaring: Vindmøllen fanger vindens rotationsenergi og bruger den til at lave strøm. Gearkassen sørger for at skrue op og ned for hastigheden, så man får mest muligt strøm ud af vindmøllens rotationsenergi. Generatoren tager denne energi og laver strøm. Inverteren gør strømmen klar til at blive brugt i en elmast, så man kan tænde en ventilator og få mere vind i lokalet.");
	// 	isExerciseDataChanged = true;
	// }

	function splitGPTTextIntoAssignments(text) {
		let assignments = [];
		let assignmentsAsText = text.split("Opgave:");

		assignmentsAsText.forEach((assignment) => {
			if (assignment.includes("Svar:")) {
				assignment = "Opgave:" + assignment + "\n";
				assignments.push({
					exercise: getStringBetween(assignment, "Opgave:", "\n"),
					hint: getStringBetween(assignment, "Hint:", "\n"),
					answer: getStringBetween(assignment, "Svar:", "\n"),
					explanation: getStringBetween(assignment, "Forklaring:", "\n"),
					isSelected: false,
				});
			}
		});

		return assignments;
	}

	function getStringBetween(str, start, end) {
		const startIndex = str.indexOf(start) + start.length;
		const endIndex = str.indexOf(end, startIndex);
		return str.substring(startIndex, endIndex);
	}

	async function saveAssignments(supabase, classroom_id) {
		if (isExerciseDataChanged) {
			await Promise.all(
				exerciseData.map(async (assignment) => {
					if (assignment.isSelected) {
						saveAssignment(supabase, classroom_id, assignment);
					}
				})
			);
		}
	}

	async function saveAssignment(supabase, classroom_id, assignment) {
		// Insert the assignment in the database
		const { data: assignmentData, error: assignmentError } = await supabase
			.from("assignments")
			.insert([
				{
					text: assignment.exercise,
					hint: assignment.hint,
					explanation: assignment.explanation,
				},
			])
			.select();
		let assignment_id = assignmentData[0].id;

		// Create relation between the assignment and the classroom
		const { data, error } = await supabase
			.from("classroom_assignments")
			.insert([{ classroom_id: classroom_id, assignment_id: assignment_id }]);
	}
</script>

<Layout title="Vælg næste lektions opgaver" showBackButton={true}>
	<div slot="body">
		<Box>
			<ExerciseList bind:data={exerciseData} />
		</Box>
		<Button color="purple1" onclick={generateAssignments}
			>Genere nye opgaver</Button
		>
		{#if isGenerating}
			<span>Generer opgaver...</span>
		{/if}
	</div>
	<Button
		slot="bottom"
		color="purple1"
		type="secondary"
		onclick={() => saveAssignments(data.supabase, data.id)}
		href="underviser">Godkend</Button
	>
</Layout>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 20px;
		place-items: center;
	}
	span {
		font-size: 2rem;
	}
</style>
