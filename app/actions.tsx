"use server";
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
  getReplyApi,
} from "@/lib/data";

import { Weather, WeatherProps } from "@/components/dui/weather";
import { Stocks, StockProps } from "@/components/dui/stocks";
import { Politics, PoliticalProps } from "@/components/dui/politics";
import { Clothing, ClothingProps } from "@/components/dui/clothing";
import { Reply, ReplyProps } from "@/components/dui/reply";

import type { Tweet } from "@/types/tweets";
import {
  FilterId,
  getFilterVoiceId,
  getResponseAdjectives,
} from "@/lib/filters";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// async function generateReply(tweet: Tweet, filterId: FilterId | null): Promise<React.ReactNode> {
// 	const adjectives = getResponseAdjectives(filterId) || "brief";
// 	const replyData = await getReplyApi(tweet.content, adjectives);
// 	if (replyData) {
// 		// if no community notes, remove.
// 		if (replyData.community_note == "None") {
// 			delete replyData.community_note;
// 		}
// 		return <Reply replies={replyData} voiceId={getFilterVoiceId(filterId) || undefined} />;
// 	}
// 	return <></>;
// }

interface Classification {}

export async function classifyTweetByContent(
  tweet: Tweet,
  filterId: FilterId | null,
) {
  const updateState = (): Promise<{
    component: React.ReactNode;
    isDone: boolean;
    isReply?: boolean;
  }> => {
    return new Promise((resolve, reject) => {
      classify(tweet, filterId, (component, isDone, isReply) => {
        resolve({ component, isDone, isReply });
      });
    });
  };

  async function doClassify() {
    return await updateState();
  }

  // Weird behavior of server components
  // They run sequentially unless wrapped in a promise
  // Ref: https://www.youtube.com/watch?v=CDZg3maL9q0
  return { promise: doClassify() };
}

async function classify(
  tweet: Tweet,
  filterId: FilterId | null,
  onUpdateDynamic: (
    component: React.ReactNode,
    isDone: boolean,
    isReply?: boolean,
  ) => void,
) {
  const tweetContent = tweet.content;

  // Hardcode Clothing UI for now
  // Since routing requires GPT4V to interpret
  // The image as containing clothing
  if (tweet.user.username === "@TechBroDrip") {
    if (tweet.media && tweet.media.length && tweet.media[0].url) {
      let clothingData = await getClothingApi(tweet.media[0].url);
      onUpdateDynamic(<Clothing props={clothingData} />, true);
    }
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
    onUpdateDynamic(<></>, true, true);
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
        onUpdateDynamic(<></>, true, true);
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
