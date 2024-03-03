import {Tweet} from "@/types/tweets";

export async function getWeather(location: string, unit: string) {
    // Dummy data for demonstration
    const weatherData: any = {
        "San Francisco": {temperature: 13, description: "Rainy"},
        "New York": {temperature: 25, description: "Sunny"},
        London: {temperature: 15, description: "Cloudy"},
        Tokyo: {temperature: 20, description: "Cloudy"},
    };

    // Default to 'San Francisco' if the location is not in the dummy data
    const weather = weatherData[location] || weatherData["San Francisco"];

    // Convert temperature to Fahrenheit if unit is 'F'
    if (unit === "F") {
        weather.temperature = (weather.temperature * 9) / 5 + 32;
    }

    return {
        temperature: weather.temperature,
        description: weather.description,
    };
}

type PoliticalStance = 'right' | 'left' | 'center';

interface PoliticalLeaningData {
    stance: PoliticalStance;
    references: string[];
}

export const getPoliticalLeaning = async (summary: string): Promise<PoliticalLeaningData> => {
    const stances: PoliticalStance[] = ['right', 'left', 'center'];
    const randomStance = stances[Math.floor(Math.random() * stances.length)]; // Randomly selects a stance

    const references = [
        `https://example.com/source${Math.floor(Math.random() * 10) + 1}`,
        `https://anotherexample.com/source${Math.floor(Math.random() * 10) + 1}`,
    ]; // Generates two random references

    // Simulating a delay to mimic asynchronous API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                stance: randomStance,
                references: references,
            });
        }, 500); // Simulate a 500ms delay
    });
};

interface StocksProps {
    ticker: string;
    amount_today: number;
    percent_today: number;
    current_price: number;
    high: number;
    low: number;
    volume: number;
    close_prices: number;
}

// Mock function to simulate fetching stock data
export const getStockData = (ticker: string): Promise<StocksProps> => {
    // Simulating a delay to mimic asynchronous API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ticker,
                amount_today: Math.random() * 10, // Random change in price for today
                percent_today: Math.random() * 5, // Random percent change for today
                current_price: 100 + Math.random() * 50, // Random current price
                high: 150 + Math.random() * 10, // Random high price
                low: 90 + Math.random() * 10, // Random low price
                volume: 1000000 + Math.floor(Math.random() * 1000000), // Random volume
                close_prices: 100 + Math.random() * 50
            });
        }, 500); // Simulate a 500ms delay
    });
};

export const tweetData: Tweet[] = [
    {
        "id": "1762494379540001174",
        "link": "/TechBroDrip/status/1762494379540001174",
        "user": {
            "username": "@TechBroDrip",
            "displayName": "Dripped Out Technology Brothers",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1529556000465793024/wiaHs-BI_x96.jpg",
            "verified": false
        },
        "content": "Mark Zuckerberg (founder of Meta)",
        "media": [{"type": "image", "url": "https://pbs.twimg.com/media/GHWjTBPbwAEBT0S?format=jpg&name=medium"}],
        "engagement": {"replies": "10", "reposts": "30", "likes": "927", "views": "63K"},
        "timestamp": "2024-02-27T15:06:20.000Z"
    },
    {
        "id": "1726679121126883442",
        "link": "/TechBroDrip/status/1726679121126883442",
        "user": {
            "username": "@TechBroDrip",
            "displayName": "Dripped Out Technology Brothers",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1529556000465793024/wiaHs-BI_x96.jpg",
            "verified": false
        },
        "content": "Emmett Shear (CEO of OpenAI + co-founder and former CEO of Twitch)",
        "media": [{"type": "image", "url": "https://pbs.twimg.com/media/F_ZlVK3asAAw81i?format=jpg&name=medium"}],
        "engagement": {"replies": "17", "reposts": "4", "likes": "160", "views": "22K"},
        "timestamp": "2023-11-20T19:09:17.000Z"
    },
    {
        "id": "1726516611962826894",
        "link": "/TechBroDrip/status/1726516611962826894",
        "user": {
            "username": "@TechBroDrip",
            "displayName": "Dripped Out Technology Brothers",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1529556000465793024/wiaHs-BI_x96.jpg",
            "verified": false
        },
        "content": "Satya Nadella (CEO of Microsoft)",
        "media": [{"type": "image", "url": "https://pbs.twimg.com/media/F_XRtQBb0AAwi24?format=jpg&name=medium"}],
        "engagement": {"replies": "5", "reposts": "13", "likes": "492", "views": "26K"},
        "timestamp": "2023-11-20T08:23:32.000Z"
    },
    {
        "id": "1726385797656379782",
        "link": "/TechBroDrip/status/1726385797656379782",
        "user": {
            "username": "@TechBroDrip",
            "displayName": "Dripped Out Technology Brothers",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1529556000465793024/wiaHs-BI_x96.jpg",
            "verified": false
        },
        "content": "Sam Altman (co-founder of OpenAI and former president of Y Combinator)",
        "media": [{"type": "image", "url": "https://pbs.twimg.com/media/F_VauwbXYAA-o3Z?format=jpg&name=medium"}],
        "engagement": {"replies": "", "reposts": "8", "likes": "257", "views": "26K"},
        "timestamp": "2023-11-19T23:43:43.000Z"
    },
    {
        "id": "1763801233339634110",
        "link": "/martin_casado/status/1763801233339634110",
        "user": {
            "username": "@martin_casado",
            "displayName": "martin_casado",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1556885485888237568/HH1iBQNp_x96.jpg",
            "verified": false
        },
        "content": "As we look to the future, it's clear that policies focusing on renewable energy and climate change are not just necessary, but urgent. We must support leaders who prioritize our planet and future generations over short-term gains. 🌍 #ClimateAction #RenewableEnergy",
        "engagement": {
            "replies": "45",
            "reposts": "30",
            "likes": "250",
            "views": "20K"
        },
        "timestamp": "2024-03-02T15:47:22.000Z"
    },
    {
        "id": "1763801233339634089",
        "link": "/Scobleizer/status/1763801233339634089",
        "user": {
            "username": "@Scobleizer",
            "displayName": "Robert Scoble",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1719781327527133184/oOgZZpVK_x96.jpg",
            "verified": false
        },
        "content": "The streets of San Francisco are glistening under the steady drizzle today. Rainy days like this bring a certain charm to the city, making every coffee shop corner a cozy refuge. ☔🌁 #SanFranciscoRain",
        "engagement": {
            "replies": "12",
            "reposts": "5",
            "likes": "87",
            "views": "10K"
        },
        "timestamp": "2024-03-02T10:15:30.000Z"
    },
    {
        "id": "1763801233339634099",
        "link": "/Scobleizer/status/1763801233339634099",
        "user": {
            "username": "@Scobleizer",
            "displayName": "Robert Scoble",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1719781327527133184/oOgZZpVK_x96.jpg",
            "verified": false
        },
        "content": "Watching $TSLA stock closely today as the market reacts to the latest electric vehicle innovations announced. The future of transportation is electric, and it's thrilling to see how Tesla leads the charge. 🔌🚗 #Tesla #StockMarket",
        "engagement": {
            "replies": "25",
            "reposts": "15",
            "likes": "130",
            "views": "15K"
        },
        "timestamp": "2024-03-02T12:30:45.000Z"
    },
    {
        "id": "1763656445545849004",
        "link": "/USFWS/status/1763656445545849004",
        "user": {
            "username": "@USFWS",
            "displayName": "U.S. Fish and Wildlife Service",
            "avatarUrl": "https://pbs.twimg.com/profile_images/877224343352348672/TIrrbqtT_x96.jpg",
            "verified": false
        },
        "content": "Do you see it? Not the great blue heron. \n\nPhotos: used with permission by Jacob Hall",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/media/GHnDnYOWIAACs-7?format=jpg&name=medium"
            }
        ],
        "engagement": {
            "replies": "55",
            "reposts": "312",
            "likes": "1.9K",
            "views": "144K"
        },
        "timestamp": "2024-03-01T20:03:58.000Z"
    },
    {
        "id": "1763813991023853587",
        "link": "/Rainmaker1973/status/1763813991023853587",
        "user": {
            "username": "@Rainmaker1973",
            "displayName": "Massimo",
            "avatarUrl": "https://pbs.twimg.com/profile_images/914888589670043654/KVvwjcWA_x96.jpg",
            "verified": false
        },
        "content": "Self pouring beer machine \n\n[ superscientific]",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/amplify_video_thumb/1763058979414896640/img/fvPXvIdZvozkK8Gt?format=jpg&name=large"
            }
        ],
        "engagement": {
            "replies": "46",
            "reposts": "62",
            "likes": "529",
            "views": "107K"
        },
        "timestamp": "2024-03-02T06:30:00.000Z"
    },
    {
        "id": "1763703079411531868",
        "link": "/EMostaque/status/1763703079411531868",
        "user": {
            "username": "@EMostaque",
            "displayName": "Emad",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1762879891060473856/9DqabWPQ_x96.jpg",
            "verified": false
        },
        "content": "",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/media/GHnui_FXUAA57HB?format=jpg&name=medium"
            }
        ],
        "engagement": {
            "replies": "6",
            "reposts": "12",
            "likes": "122",
            "views": "9.6K"
        },
        "timestamp": "2024-03-01T23:09:16.000Z"
    },
    {
        "id": "1763802999951175807",
        "link": "/martin_casado/status/1763802999951175807",
        "user": {
            "username": "@martin_casado",
            "displayName": "martin_casado",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1556885485888237568/HH1iBQNp_x96.jpg",
            "verified": false
        },
        "content": "",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/media/GHpJcZAbsAAVVOl?format=jpg&name=900x900"
            }
        ],
        "engagement": {
            "replies": "2",
            "reposts": "",
            "likes": "24",
            "views": "2.6K"
        },
        "timestamp": "2024-03-02T05:46:19.000Z"
    },
    {
        "id": "1763413922483150970",
        "link": "/BUILD_OR_DIE/status/1763413922483150970",
        "user": {
            "username": "@BUILD_OR_DIE",
            "displayName": "BUILD OR DIE",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1736573607613014016/fSsKNAmm_x96.jpg",
            "verified": false
        },
        "content": ".\n@elonmusk\n's Engineering Design Process\n\n1. Make requirements less dumb \n2. Delete the part or process\n3. Simplify or optimize\n4. Accelerate cycle-time\n5. Automate\n\n\"The most common error of a smart engineer is to optimise a thing that should not exist...”",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/ext_tw_video_thumb/1763413856976605185/pu/img/92QZumlU_wQ2oz-m?format=jpg&name=medium&eeid=3"
            }
        ],
        "engagement": {
            "replies": "19",
            "reposts": "389",
            "likes": "2K",
            "views": "202K"
        },
        "timestamp": "2024-03-01T04:00:16.000Z"
    },
    {
        "id": "1763801233339634078",
        "link": "/Scobleizer/status/1763801233339634078",
        "user": {
            "username": "@Scobleizer",
            "displayName": "Robert Scoble",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1719781327527133184/oOgZZpVK_x96.jpg",
            "verified": false
        },
        "content": "My friend Jeff just told me that the next Tesla Roadster’s underside is an upside down wing. With air jets under the front of the car pushing back which forces it to “suck down” and give extraordinary tire traction.\n\nLike an F1 car.\n\nHe was the first CTO on Wall Street and…",
        "engagement": {
            "replies": "39",
            "reposts": "19",
            "likes": "211",
            "views": "31K"
        },
        "timestamp": "2024-03-02T05:39:18.000Z"
    },
    {
        "id": "1763651097342758947",
        "link": "/LinusEkenstam/status/1763651097342758947",
        "user": {
            "username": "@LinusEkenstam",
            "displayName": "Linus (●ᴗ●) Ekenstam",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1584806710769762304/qCu_Jaox_x96.jpg",
            "verified": false
        },
        "content": "Why does hotel rooms only have one desk space? \n\nIt’s concerning how behind they are the modern society",
        "engagement": {
            "replies": "16",
            "reposts": "1",
            "likes": "22",
            "views": "15K"
        },
        "timestamp": "2024-03-01T19:42:43.000Z"
    },
    {
        "id": "1763723097440403931",
        "link": "/thenetrunna/status/1763723097440403931",
        "user": {
            "username": "@thenetrunna",
            "displayName": "Netrunner — e/acc",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1762929887642333184/rJSX-5t__x96.jpg",
            "verified": false
        },
        "content": "what did ilya see? what did Karpathy see? what did Elon see? what did Logan see? what did roon see? what did jimmy apples see? what did netrunner see? what did the AGI see?",
        "engagement": {
            "replies": "50",
            "reposts": "22",
            "likes": "253",
            "views": "34K"
        },
        "timestamp": "2024-03-02T00:28:49.000Z"
    },
    {
        "id": "1763666653748105404",
        "link": "/AravSrinivas/status/1763666653748105404",
        "user": {
            "username": "@AravSrinivas",
            "displayName": "Aravind Srinivas",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1735494334471086080/dQ90FPoq_x96.jpg",
            "verified": false
        },
        "content": "“The problem that Google faces today relative to the likes of OpenAI and Perplexity is very similar to what we did to Microsoft 20 years ago. What ChatGPT in particular has made us realize is that many of the tasks that we have so far labeled \"search\" and where we click on blue…",
        "engagement": {
            "replies": "31",
            "reposts": "52",
            "likes": "475",
            "views": "223K"
        },
        "timestamp": "2024-03-01T20:44:32.000Z"
    },
    {
        "id": "1763595049881968661",
        "link": "/IroncladDev/status/1763595049881968661",
        "user": {
            "username": "@IroncladDev",
            "displayName": "IroncladDev ",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1587110787277103104/3jOe4QcP_x96.png",
            "verified": false
        },
        "content": "it's friday let's get it",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/media/GHh_dRrXIAAGjdI?format=png&name=small"
            }
        ],
        "engagement": {
            "replies": "3",
            "reposts": "3",
            "likes": "43",
            "views": "1.1K"
        },
        "timestamp": "2024-03-01T16:00:00.000Z"
    },
    {
        "id": "1763680148799303764",
        "link": "/volodarik/status/1763680148799303764",
        "user": {
            "username": "@volodarik",
            "displayName": "Aleksandr Volodarsky",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1676754781212123136/ZxNO4Ede_x96.jpg",
            "verified": false
        },
        "content": "Famously Facebook turned down Yahoo's $1B acquisition offer in 2006 and is now worth $1.28T.\n\nFor many it does not turn out well:\n\n Groupon declined a $6 billion offer from Google in 2010. Since then, its valuation has dropped to $600M\n\n Moz declined a $25M M&A deal from…",
        "engagement": {
            "replies": "38",
            "reposts": "140",
            "likes": "926",
            "views": "367K"
        },
        "timestamp": "2024-03-01T21:38:09.000Z"
    },
    {
        "id": "1763726146183844008",
        "link": "/jachiam0/status/1763726146183844008",
        "user": {
            "username": "@jachiam0",
            "displayName": "Joshua Achiam ",
            "avatarUrl": "https://pbs.twimg.com/profile_images/967329395080744960/O-MKd6Nx_x96.jpg",
            "verified": false
        },
        "content": "(Silicon Valley HBO 2024) Hooli's new flagship chat model, \"Bighead,\" is unexpectedly political. Gavin Belson frantically rewrites the system prompts manually in an attempt to \"fix\" it.",
        "engagement": {
            "replies": "7",
            "reposts": "18",
            "likes": "245",
            "views": "17K"
        },
        "timestamp": "2024-03-02T00:40:56.000Z"
    },
    {
        "id": "1763721070765342914",
        "link": "/morqon/status/1763721070765342914",
        "user": {
            "username": "@morqon",
            "displayName": "morgan —",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1712182984084803584/AnClMwYr_x96.jpg",
            "verified": false
        },
        "content": "openai memo to staff: elon’s allegations “do not reflect the reality of our work or mission”\n\naltman: “the attacks will keep coming”",
        "engagement": {
            "replies": "3",
            "reposts": "4",
            "likes": "71",
            "views": "12K"
        },
        "timestamp": "2024-03-02T00:20:46.000Z"
    },
    {
        "id": "1763535656993608057",
        "link": "/DeniTechh/status/1763535656993608057",
        "user": {
            "username": "@DeniTechh",
            "displayName": "Deni | denitech.dev",
            "avatarUrl": "https://pbs.twimg.com/profile_images/1727760312932139008/4tzWgbyn_x96.jpg",
            "verified": false
        },
        "content": "Learn to code.\n\nEven if NVIDIA CEO tells you that you don’t need to, because of AI.",
        "media": [
            {
                "type": "image",
                "url": "https://pbs.twimg.com/media/GHlWVQXXQAEd3ta?format=jpg&name=900x900"
            }
        ],
        "engagement": {
            "replies": "129",
            "reposts": "86",
            "likes": "603",
            "views": "41K"
        },
        "timestamp": "2024-03-01T12:04:00.000Z"
    }
]

export const trimmedTweetData = tweetData.slice(0, 3);