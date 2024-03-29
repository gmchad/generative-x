import * as React from "react";
import { z } from "zod";
import OpenAI from "openai";

import { runOpenAICompletion } from "@/lib/utils";
import { getStockData, getPoliticalLeaning } from "@/lib/test-data";

import {
  getWeatherApi,
  getPoliticalApi,
  getStockApi,
  getClothingApi,
} from "@/lib/data";

import { Weather } from "@/components/dui/weather";
import { Stocks } from "@/components/dui/stocks";
import { Politics } from "@/components/dui/politics";
import { Clothing } from "./dui/clothing";

import type { Tweet } from "@/types/tweets";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

function classifyTweetByContent(
  tweet: Tweet,
  onUpdateDynamic: (component: React.ReactNode, isDone: boolean) => void,
  onReplyToText: (newText: string) => void,
  onReplaceTweetText: (newText: string) => void,
) {
  const tweetContent = tweet.content;

  // Hardcode Clothing UI for now
  // TODO: @Dhruv
  if (tweet.user.username === "@TechBroDrip") {
    if (tweet.media && tweet.media.length && tweet.media[0].url) {
      getClothingApi(tweet.media[0].url)
        .then((clothingData) => {
          onUpdateDynamic(<Clothing props={clothingData} />, true);
        })
        .catch((err) => {
          onReplyToText(tweetContent);
          console.error(err);
        });
    } else onReplyToText(tweetContent);
    return;
  }

  const completion = runOpenAICompletion(openai, {
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
You are a generative twitter bot. You will receive raw tweet data and manipulate the data to fit certain criterias.

If the tweet mentions the weather of a location, call \`get_current_weather\` to show the weather UI.
If the tweet mentions the stocks and/or has a ticket symbol like $AAPL, $TSLA, $META, $MSFT, $GOOG call \`get_stock_price\` to show the stock price UI.				
If the tweet mentions deep political issues, call the \`get_political_stance\` to show a political stance UI.

Otherwise just say 'reply' and we will show a reply UI.
				`,
      },
      {
        role: "user",
        content: tweetContent,
      },
    ],
    functions: [
      {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: z.object({
          location: z
            .string()
            .describe("The city and state, e.g. San Francisco, London, Hawaii"),
          unit: z.string().describe("The unit of the temperature, e.g. C or F"),
        }),
      },
      {
        name: "get_stock_price",
        description:
          "Get the current stock price of a given stock or currency based on it's ticker symbol. Use this to show the price to the user.",
        parameters: z.object({
          ticker: z
            .string()
            .describe(
              "The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.",
            ),
        }),
      },
      {
        name: "get_political_stance",
        description:
          "Summarize the tweet and any political references. Use this to show a political UI to the user.",
        parameters: z.object({
          summary: z.string().describe("The political summary of the tweet"),
        }),
      },
    ] as const,
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    // onUpdateDynamic(isFinal ? <Replies tweetId={tweet.id} tweetContent={tweetContent}/> : content, isFinal);
    isFinal && onReplyToText(tweetContent);
  });

  completion.onFunctionCall(
    "get_political_stance",
    async ({ summary }: { summary: string }) => {
      const polticalData = await getPoliticalApi(tweet.content);
      onUpdateDynamic(<Politics props={polticalData} />, true);
    },
  );

  completion.onFunctionCall(
    "get_stock_price",
    async ({ ticker }: { ticker: string }) => {
      const stockData = await getStockApi(ticker);
      const isStockDataBroken =
        !stockData || !stockData.current_price || !stockData.ticker;
      if (isStockDataBroken) {
        console.error("Stock data is broken", ticker, stockData);
        onReplyToText(tweetContent);
      } else onUpdateDynamic(<Stocks props={stockData} />, true);
    },
  );

  completion.onFunctionCall(
    "get_current_weather",
    async ({ location, unit }) => {
      const weatherData = await getWeatherApi(location);
      onUpdateDynamic(<Weather props={weatherData} />, true);
    },
  );
}

export function useClassifiedTweet(
  initialTweet: Tweet,
  enabled: boolean,
): {
  isClassified: boolean;
  isReply: boolean;
  tweetComponent: React.ReactNode;
  replacedTweetText: string;
} {
  // local state
  const [isClassified, setIsClassified] = React.useState(false);
  const [isReply, setIsReply] = React.useState<boolean>(false);
  const [tweetComponent, setTweetComponent] =
    React.useState<React.ReactNode>(null);
  const [replacementTweetText, setReplacementTweetText] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    if (!enabled) {
      setIsClassified(false);
      setTweetComponent(null);
      setReplacementTweetText(null);
      setIsReply(false);
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
        () => {
          setIsReply(true);
          setIsClassified(true);
        },
        (newText) => setReplacementTweetText(newText),
      );
    }

    const timeoutId = setTimeout(doClassify, 1000);
    return () => clearTimeout(timeoutId);
  }, [enabled, initialTweet]);

  return {
    isClassified,
    isReply,
    tweetComponent,
    replacedTweetText:
      replacementTweetText !== null
        ? replacementTweetText
        : initialTweet.content,
  };
}
