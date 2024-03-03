import * as React from "react";
import {useQuery} from "react-query";
import {FilterId, getResponseAdjectives} from "@/components/filters";


const RENDER_ENDPOINT = "https://spc-openai-hackathon-backend.onrender.com/";


export function Replies(props: {
    tweetContent: string,
    tweetId: string,
    filterId: FilterId | null,
    className: string
}) {

    const adjectives = getResponseAdjectives(props.filterId) || 'brief';

    // reactive query
    const {data: replies} = useQuery(`replies-${props.tweetId}-${props.filterId || 'null'}`, {
        enabled: !!props.tweetId,
        queryFn: async () => {
            const endpoint = `${RENDER_ENDPOINT}/question_replies?text=${encodeURIComponent(props.tweetContent)}&adjective=${encodeURIComponent(adjectives)}`;
            const response = await fetch(endpoint);
            return response.json();
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
    });

    console.log(replies);

    return <div>replies {JSON.stringify(replies, null, 2)}</div>;
}