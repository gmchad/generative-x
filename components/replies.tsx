import * as React from "react";
import { useQuery } from "react-query";
import { FilterId, getResponseAdjectives } from "@/lib/filters";
import { Reply } from "@/components/dui/reply";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const RENDER_ENDPOINT = "https://spc-openai-hackathon-backend.onrender.com/";

export function Replies(props: {
  tweetContent: string;
  tweetId: string;
  filterId: FilterId | null;
  voiceId: string | undefined;
  className: string;
}) {
  const adjectives = getResponseAdjectives(props.filterId) || "brief";

  // reactive query
  const { data: replies } = useQuery(
    `replies-${props.tweetId}-${props.filterId || "null"}`,
    {
      enabled: !!props.tweetId,
      queryFn: async () => {
        const endpoint = `${RENDER_ENDPOINT}/question_replies?text=${encodeURIComponent(props.tweetContent)}&adjective=${encodeURIComponent(adjectives)}`;
        const response = await fetch(endpoint);
        return response.json();
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  );

  console.log(replies);

  if (replies) {
    // if no community notes, remove.
    if (replies.community_note == "None") {
      delete replies.community_note;
    }
    return (
      <div className="mt-4">
        <Reply replies={replies} voiceId={props.voiceId} />
      </div>
    );
  }
}
