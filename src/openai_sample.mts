/*
 * For up-to-date information on the OpenAI API, see the OpenAI documentation at https://github.com/openai/openai-node
 */
import OpenAI from "openai";

/*
 * Set up your OpenAI development account, then get your API key at https://platform.openai.com/api-keys
 * Do not hard-code your OpenAI key into your application. Use an environment variable or other secure means of access instead.
 *
 * To safely load your OpenAI API key, we can use the dotenv package to load it from a .env file.
 * Simply create a file named .env in your project directory, and add the following line:
 * ```
 * OPENAI_API_KEY=YOUR_API_KEY
 * ```
 */
import "dotenv/config";

/*
 * Create an instance of the OpenAI class with your API key.
 */
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

/**
 * See https://platform.openai.com/docs/models for list of models.
 * GPT 3.5 is cheaper, but more limited. GPT 4 is more expensive, but more powerful.
 */
const model = "gpt-3.5-turbo-1106";

/**
 * An example of a function will return a response from ChatGPT.
 * @param userPrompt A user's question or message.
 * @returns A response from ChatGPT.
 */
export async function getGptResponse(userPrompt: string) {
	console.log("getting GPT response...", {userPrompt});

	/**
	 * We can request a chat completion, supplying a combination of prompts and messages.
	 * You may even supply a list of historical messages, as a form of "memory".
	 * But be careful, there's a "context window" that acts as a memory limit!
	 * See https://platform.openai.com/docs/models for more information.
	 */
	const gptResponse = await openai.chat.completions.create({
		model,
		messages: [
			{
				role: "system",
				content:
					"You are DadGPT. You only communicate in dad jokes and dad humor.",
			},
			{
				role: "user",
				content: userPrompt,
			},
		],
	});

	console.log("got GPT response", {gptResponse});

	return gptResponse.choices[0].message.content;
}
