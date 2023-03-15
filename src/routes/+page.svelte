<script>
	// import supabase from "$lib/db";
	import { browser } from "$app/environment";
	import { serialHandler } from '$lib/serial-handler.ts';
	// import onMount from "svelte";

	// onMount(async () => { 
	// 	const { data: arduino, error } = await supabase.from("arduino").select("*");
	// 	if (error) throw new Error(error.message);

	// 	console.log(arduino)
	// })

	async function getData() {
		// const channel = supabase.channel('room1');

		// supabase.channel('room1')
		// 		.on('broadcast', { event: 'feedback' }, async (payload) => {
		// 			console.log(payload);
		// 			if (!payload.payload.feedback) {
		// 				await sendOffMsg();
		// 			} else if (payload.payload.correct) {
		// 				await sendGreenMsg();
		// 			} else {
		// 				await sendRedMsg();
		// 			}
		// 		})
		// 		.subscribe((status) => {
		// 			if (status === 'SUBSCRIBED') {
		// 				// your callback function will now be called with the messages broadcast by the other client
		// 			}
		// 		})

		// const { data: pieces, error } = await supabase.from("pieces").select("*");
		// if (error) throw new Error(error.message);

		// {
		// 	const { data: arduino, error } = await supabase.from("arduino").select("*");
		// 	if (error) throw new Error(error.message);

		// 	let feedback = arduino.find(x => x.id === 1).feedback;

		// }

		// return pieces;
	}
	
	async function connectPort() {
		await serialHandler.init();
	}
	async function readPort() {
		let arduino_input = await serialHandler.read();
		console.log(arduino_input);
	}
	async function sendOffMsg() {
		serialHandler.write("0\n");
	}
	async function sendOnMsg() {
		serialHandler.write("1\n");
	}
	async function sendGreenMsg() {
		serialHandler.write("2\n");
	}
	async function sendRedMsg() {
		serialHandler.write("3\n");
	}
	async function sendRGBMsg(r,g,b) {
		serialHandler.write(`4:${r},${g},${b}\n`);
	}



</script>

<!-- <h1>The pieces</h1>
{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as piece}
		<li>{piece.name}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await} -->

<button on:click={connectPort}>Connect to arduino</button><br><br>
<button on:click={sendOffMsg}>Light: Off</button><br><br>
<button on:click={sendGreenMsg}>Light: Green</button><br><br>
<button on:click={sendRedMsg}>Light: Red</button>
<!-- <button on:click={readPort}>Read arduino</button> -->
<!-- <button on:click={sendOffMsg}>Off</button>
<button on:click={sendOnMsg}>On</button> -->