<script>
	// import { Configuration, OpenAIApi } from "openai";

	// const configuration = new Configuration({
	// 	apiKey: import.meta.env.VITE_OPENAI_API_KEY
	// });
	// const openai = new OpenAIApi(configuration);

	let input = "";
	let isGenerating = false;
	let messages = [];

	// async function generate(){
	// 	isGenerating = true;
	// 	messages = [...messages, {role: "user", content: input}];
	// 	input = "";
	// 	const completion = await openai.createChatCompletion({
	// 	model: "gpt-3.5-turbo",
	// 	messages: messages,
	// 	// temperature: 0,
	// 	});
	// 	let message = completion.data.choices[0].message
	// 	console.log(message);
	// 	messages = [...messages, message];
	// 	isGenerating = false;
	// }

	function clearMessages() {
		messages = [];
	}

	async function generateResponse() {
		isGenerating = true;
		messages = [...messages, {role: "user", content: input}];
		input = "";

		const response = await fetch('/api/chatgpt', {
			method: 'POST',
			body: JSON.stringify(messages),
			headers: {
				'content-type': 'application/json'
			}
    	});

    	messages = await response.json();
		isGenerating = false;
  	}

</script>

<button on:click={clearMessages}>Clear</button>
<br><br>
<form on:submit={generateResponse} >

	<input type="text" name="chat-input" id="chat-input" bind:value={input}>

	{#if !isGenerating}
		<button on:click={generateResponse}>Generate</button>
	{:else}
		<span>Generating...</span>
	{/if}
</form>

{#each messages as message}
	<br>
	<p>{message.role}</p>
	<p style="width: 500px; background-color: #eee; padding: 10px; border-radius: 10px; white-space: pre-line;">{message.content}</p>
{/each}
