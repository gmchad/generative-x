import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

type Article = {
  link: string;
  title: string;
};

type PoliticalProps = {
  articles: Article[];
  party: string;
};

export const Politics = ({ props }: { props: PoliticalProps }) => {
  const colorClass = {
    right: "text-red-600",
    left: "text-blue-600",
    center: "text-purple-600",
  }[props.party];

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-col items-start">
        <CardTitle className="text-center text-2xl">
          Political Leaning
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1.5">
        <div className={`flex items-center justify-start`}>
          {/* <span className="text-sm justify-center">Political Leaning: </span> */}
          {/* <span className={`text-xl font-semibold ${colorClass} ml-1`}>{props.party}</span> */}
        </div>
        <div className="container flex justify-between">
          {props.party === "Left" ? (
            <div className="container flex justify-between">
              <div className="item w-1/3 text-left text-xl font-bold text-blue-600">
                Left
              </div>
              <div className="item w-1/3 text-center text-xl">Center</div>
              <div className="item w-1/3 text-right text-xl">Right</div>
            </div>
          ) : props.party === "Right" ? (
            <div className="container flex justify-between">
              <div className="item w-1/3 text-left text-xl">Left</div>
              <div className="item w-1/3 text-center text-xl">Center</div>
              <div className="item w-1/3 text-right text-xl font-bold text-red-600">
                Right
              </div>
            </div>
          ) : (
            <div className="container flex justify-between">
              <div className="item w-1/3 text-left text-xl">Left</div>
              <div className="item w-1/3 text-center text-xl font-bold text-purple-600">
                Center
              </div>
              <div className="item w-1/3 text-right text-xl">Right</div>
            </div>
          )}
        </div>
        <div className="... ml-10 h-10 w-64 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"></div>

        <div className="flex flex-col text-xs">
          <span className="mt-4 text-xl">Related Sources:</span>
          {props.articles.map((article, index) => (
            <div
              className=" mb-2 rounded-lg border border-white p-4"
              key={index}
            >
              <a
                key={index}
                href={article.link}
                className="text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
