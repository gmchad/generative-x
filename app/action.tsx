import 'server-only';

import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import { runOpenAICompletion } from '@/lib/utils';
import { BotMessage } from '@/components/message';
import { spinner } from '@/components/ui/spinner';
import { Weather } from '@/components/weather';
import { getWeather } from '@/lib/test-data';
import { z } from 'zod';
import OpenAI from 'openai';
import TweetComponentSkeleton from '@/components/tweetskeleton';
import TweetComponent from '@/components/tweet';
import { Tweet } from '@/types/tweets';


const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
});

async function submitTweet(tweet: Tweet) {
	'use server';

	const aiState = getMutableAIState<typeof AI>();
	aiState.update([
		...aiState.get(),
		{
			role: 'user',
			content: JSON.stringify(tweet),
		},
	]);

	const reply = createStreamableUI(<TweetComponentSkeleton/>);

	const completion = runOpenAICompletion(openai, {
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: [
			{
				role: "system",
				content: `\
You are a generative twitter bot. You will receive raw tweet data and manipulate the data to fit certain criterias.

If the tweet mentions the weather of a location, call \`get_current_weather\` to show the weather UI.
				
				
				`,
			},
			...aiState.get().map((message: any) => ({
				role: message.role,
				content: message.content,
			})),
		],
		functions: [
			{
				name: "get_current_weather",
				description: "Get the current weather in a given location",
				parameters: z.object({
					location: z
						.string()
						.describe("The city and state, e.g. San Francisco, CA"),
					unit: z.string().describe("The unit of the temperature, e.g. C or F"),
				}),
			},
		] as const,
		temperature: 0,
	});

	// TODO: modify so we can get original message if no filters are used
	completion.onTextContent((content: string, isFinal: boolean) => {
		reply.update(<BotMessage>{content}</BotMessage>);
		if (isFinal) {
			reply.done();
			aiState.done([...aiState.get(), { role: 'assistant', content }]);
		}
	});

	completion.onFunctionCall(
		"get_current_weather",
		async ({ location, unit }) => {
			const { temperature, description } = await getWeather(location, unit);

			reply.update(
				<TweetComponentSkeleton/>
			);

			reply.done(
				<TweetComponent tweet={tweet} DynamicComponent={
				<Weather
					temperature={temperature}
					unit={unit}
					description={description}
				/>}>
				</TweetComponent>
			);

			aiState.done([
				...aiState.get(),
				{
					role: "system",
					content: `The weather is ${temperature}${unit}, ${description}.`,
				},
			]);
		},
	);

	return {
		id: Date.now(),
		display: reply.value,
	};
}

const initialAIState: {
	role: 'user' | 'assistant' | 'system' | 'function';
	content: string;
	id?: string;
	name?: string;
}[] = [];

const initialUIState: {
	id: number;
	display: React.ReactNode;
}[] = [];

export const AI = createAI({
	actions: {
		submitTweet,
	},
	initialUIState,
	initialAIState,
});