import Fastify from "fastify";
import {getGptResponse} from "./openai_sample.mts";

/**
 * Configuration for the fastify server.
 */
const FASTIFY_OPTIONS: Fastify.FastifyListenOptions = {
	port: 3000,
	host: "localhost",
};

const SERVER = Fastify();

// Define routes. e.g. "/" is the root path of the server.
SERVER.get("/", async (_, fastifyReply) => {
	// In this sample, we've defined a route that will return a response from ChatGPT.
	// You can test this route by visiting http://localhost:3000 in your browser.
	// It may take some time to load while ChatGPT generates a response.
	const QUESTION = "What's the weather like?";
	const ANSWER = await getGptResponse(QUESTION);

	// Sending a response in HTML so it's _slightly_ prettier than plain text.
	return fastifyReply.type("text/html").send(`
		<h3>User Question:</h3>
		<p>${QUESTION}</p>
		<hr />
		<h3>ChatGPT Response:</h3>
		<p>${ANSWER}</p>
	`);
});

// Start the server.
SERVER.listen(FASTIFY_OPTIONS, () => {
	console.log(
		`server is running on http://${FASTIFY_OPTIONS.host}:${FASTIFY_OPTIONS.port}`,
	);
});
