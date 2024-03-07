import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";

// type ClothingProps = {
//     img_src: string;
//     item_link: string;
//     description: string;
//     item_type: string;
// };

interface TwitterCardProps {
  img_src: string;
  item_link: string;
  description: string;
  item_type: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
  img_src,
  item_link,
  description,
  item_type,
}) => {
  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", margin: "10px" }}>
      <a href={item_link} target="_blank" rel="noopener noreferrer">
        <img
          src={img_src}
          alt={item_type}
          className="h-full w-full cursor-pointer object-cover"
        />
      </a>
      <div>
        {/* <p>{description}</p> */}
        <p>Type: {item_type}</p>
      </div>
    </div>
  );
};

export interface ClothingProps {
  data: {
    [category: string]: {
      img_src: string;
      item_link: string;
      description: string;
      item_type: string;
    }[];
  };
}

// TODO: @Dhruv
export const Clothing = ({ props }: { props: ClothingProps }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-col items-start">
        <CardTitle className="text-center text-2xl">Get This Outfit</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="flex space-x-4 py-2">
          {Object.entries(props)
            .filter(([category, items]) => items.length > 0)
            .map(([category, items], index) => (
              <div key={index} className="min-w-[200px]">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-lg text-black">
                    <h2 className="text-center">{category}</h2>
                  </div>
                  {items.map((item: any, index: number) => (
                    <TwitterCard key={index} {...item} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
