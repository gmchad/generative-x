import * as React from "react";
import {z} from 'zod';
import OpenAI from 'openai';

import {runOpenAICompletion} from '@/lib/utils';
import {getWeather} from '@/lib/test-data';
import {Weather} from '@/components/weather';

import type {Tweet} from '@/types/tweets';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    dangerouslyAllowBrowser: true,
});


function classifyTweetByContent(
    tweet: Tweet,
    onUpdateDynamic: (component: React.ReactNode, isDone: boolean) => void,
    onReplaceTweetText: (newText: string) => void,
) {

    const tweetContent = tweet.content;

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
            {
                role: "user",
                content: tweetContent,
            }
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
        onUpdateDynamic(content, isFinal);
    });

    completion.onFunctionCall(
        "get_current_weather",
        async ({location, unit}) => {
            const {temperature, description} = await getWeather(location, unit);
            onUpdateDynamic(
                <Weather
                    temperature={temperature}
                    // unit={unit}
                    description={description}
                />
                , true
            );
        },
    );

}


export function useClassifiedTweet(initialTweet: Tweet, enabled: boolean): {
    isClassified: boolean,
    tweetComponent: React.ReactNode,
    replacedTweetText: string
} {

    // local state
    const [isClassified, setIsClassified] = React.useState(false);
    const [tweetComponent, setTweetComponent] = React.useState<React.ReactNode>(null);
    const [replacementTweetText, setReplacementTweetText] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!enabled) {
            setIsClassified(false);
            setTweetComponent(null);
            setReplacementTweetText(null);
            return;
        }

        async function doClassify() {
            setIsClassified(false);
            classifyTweetByContent(
                initialTweet,
                (component, isDone) => {
                    setTweetComponent(component);
                    isDone && setIsClassified(isDone);
                },
                (newText) => setReplacementTweetText(newText)
            );
        }

        const timeoutId = setTimeout(doClassify, 1000);
        return () => clearTimeout(timeoutId);
    }, [enabled, initialTweet]);

    return {
        isClassified,
        tweetComponent,
        replacedTweetText: replacementTweetText !== null ? replacementTweetText : initialTweet.content,
    };
}
