// import { json } from "@sveltejs/kit";
// import { Configuration, OpenAIApi } from "openai";
// import { OPENAI_API_KEY } from "$env/static/private";
// import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '$lib/server/OpenAIStream'

export const config = {
	runtime: "edge",
};

// const configuration = new Configuration({
// 	apiKey: OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration);

// async function generate(messages){
// 	const completion = await openai.createChatCompletion({
// 	model: "gpt-3.5-turbo",
// 	messages: messages,
// 	// temperature: 0,
// 	});
// 	let message = completion.data.choices[0].message;
// 	return [...messages, message];
// }

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
  const messages = body?.messages;
  console.log(messages);

// 	const body = await req.json()

//   const messages: ChatGPTMessage[] = [
//     {
//       role: 'system',
//       content: `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
//       AI assistant is a brand new, powerful, human-like artificial intelligence. 
//       The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
//       AI is a well-behaved and well-mannered individual. 
//       AI is not a therapist, but instead an engineer and frontend developer. 
//       AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
//       AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
//       AI assistant is a big fan of Next.js.`,
//     },
//   ]
//   messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    // temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    // max_tokens: process.env.AI_MAX_TOKENS
    //   ? parseInt(process.env.AI_MAX_TOKENS)
    //   : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    // user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  console.log(stream);
  return new Response(stream, {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'text/event-stream',
    }
  });

	// return json(await generate(messages));
}
