import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"

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
  const handleClick = () => {
    // You can customize the behavior when the image is clicked, such as navigating to the item link
    window.open(item_link, '_blank');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <img
        src={img_src}
        alt={item_type}
        style={{ width: '300%', height: '300%', cursor: 'pointer' }}
        onClick={handleClick}
      />
      {/* <div>
        <p>{description}</p>
        <p>Type: {item_type}</p>
      </div> */}
    </div>
  );
};

interface ClothingProps {
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
export const Clothing = ({props}: {props : ClothingProps}) => {
 return (
    <Card className="w-full max-w-sm">
            <CardHeader className="flex-col items-start">
                    <CardTitle className="text-2xl text-center">Get This Outfit</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1.5">
                    <div className={`flex items-center justify-start`}>
                        {/* <span className="text-sm justify-center">Political Leaning: </span> */}
                        {/* <span className={`text-xl font-semibold ${colorClass} ml-1`}>{props.party}</span> */}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent className="overflow-visible">
                                {Object.entries(props)
                                .filter(([category, items]) => items.length > 0).map(([category, items]) => (
                                    <div className="grid gap-4 px-1.5">
                                        <div className="flex items-center">
                                        <div className="text-lg text-black shadcn-accent-pill rounded-full"></div>
                                    <div key={category}>
                                    <h2 style={{ textAlign: 'center' }}>{category}</h2>
                                        {
                                            items.map((item: any , index: number) => (
                                            <TwitterCard key={index} {...item} />
                                        ))}
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="max-w-sm"/>
                            <CarouselNext className="max-w-sm"/>
                        </Carousel>
                    </div>


            </CardContent>
    </Card>
 )
}