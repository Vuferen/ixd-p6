import { json } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function generate(messages){
	const completion = await openai.createChatCompletion({
	model: "gpt-3.5-turbo",
	messages: messages,
	// temperature: 0,
	});
	let message = completion.data.choices[0].message;
	return [...messages, message];
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const messages = await request.json();

	return json(await generate(messages));
}
