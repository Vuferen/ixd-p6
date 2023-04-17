<script>
	import { browser } from "$app/environment";
	import { serialHandler } from '$lib/serial-handler.ts';
	import DragList from "$lib/DragList.svelte";
	
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
	

	export let data;
	$: if (data.supabase) {
	}

	async function getPieces() {
		const { data: pieces} = await data.supabase.from('pieces').select('id, name, position');
		pieces.forEach(element => {
			if (element.position != null) {
				placedPieces = [...placedPieces, element];
			} else {
				unplacedPieces = [...unplacedPieces, element];
			}
		});
		placedPieces.sort(comparePosition);
		// console.log(tableData);
		// unplacedPieces = tableData;
	}

	function comparePosition(a, b) {
		if (a.position < b.position) {
			return -1;
		}
		if (a.position > b.position) {
			return 1;
		}
		return 0;
	}

	getPieces();


	let placedPieces = [];
	let unplacedPieces = [];

	async function update_db_positions(pieces) {
		for (let i = 0; i < pieces.length; i++) {
			const piece = pieces[i];
			if (piece.position != i) {
				const { error } = await data.supabase
					.from('pieces')
					.update({ position: i })
					.eq('id', piece.id);
			}
		}
	}

	async function update_db_positions_to_null(pieces) {
		pieces.forEach(async piece => {
			if (piece.position != null) {
				const { error } = await data.supabase
				.from('pieces')
				.update({ position: null })
				.eq('id', piece.id);
				piece.position = null;
			}
		});
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

<h1>Piece order</h1>
<h2>Placed pieces</h2>
<DragList items={placedPieces} finalizeCallback={update_db_positions}></DragList>
<h2>Unplaced pieces</h2>
<DragList items={unplacedPieces} finalizeCallback={update_db_positions_to_null}></DragList>