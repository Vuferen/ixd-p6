<script>
	import supabase from "$lib/db";
	import { browser } from "$app/environment";
	import { serialHandler } from '$lib/serial-handler.ts';
	// import onMount from "svelte";

	// onMount(async () => { 
	// 	const { data: arduino, error } = await supabase.from("arduino").select("*");
	// 	if (error) throw new Error(error.message);

	// 	console.log(arduino)
	// })
	
	const channel = supabase.channel('room1');
	channel.subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				// console.log(status)
			}
	})

	async function getData() {
		const { data: pieces, error } = await supabase.from("pieces").select("*");
		if (error) throw new Error(error.message);

		{
			const { data: arduino, error } = await supabase.from("arduino").select("*");
			if (error) throw new Error(error.message);

			let feedback = arduino.find(x => x.id === 1).feedback;

		}

		return pieces;
	}
	
	async function connectPort() {
		await serialHandler.init();
	}
	async function readPort() {
		let arduino_input = await serialHandler.read();
		console.log(arduino_input);
	}
	async function sendOffMsg() {
		// serialHandler.write("0\n");
		channel.send({
			type: 'broadcast',
			event: 'feedback',
			payload: { feedback: false },
		})
	}
	async function sendOnMsg() {
		// serialHandler.write("1\n");
		channel.send({
			type: 'broadcast',
			event: 'feedback',
			payload: { feedback: true },
		})
	}
	async function sendGreenMsg() {
		// serialHandler.write("1\n");
		channel.send({
			type: 'broadcast',
			event: 'feedback',
			payload: { feedback: true, correct: true },
		})
	}
	async function sendRedMsg() {
		// serialHandler.write("1\n");
		channel.send({
			type: 'broadcast',
			event: 'feedback',
			payload: { feedback: true, correct: false },
		})
	}



</script>

<h1>ADMIN PAGE</h1>
<!-- {#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as piece}
		<li>{piece.name}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await} -->

<!-- <button on:click={connectPort}>Connect to arduino</button> -->
<!-- <button on:click={readPort}>Read arduino</button> -->
<button on:click={sendOffMsg}>Light: Off</button>
<button on:click={sendGreenMsg}>Light: Green</button>
<button on:click={sendRedMsg}>Light: Red</button>
<!-- <button on:click={sendOnMsg}>On</button> -->
