import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

// type ClothingProps = {
//     img_src: string;
//     item_link: string;
//     description: string;
//     item_type: string;
// };

interface TwitterCardProps {
  imgSrc: string;
  itemLink: string;
  description: string;
  itemType: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
  imgSrc,
  itemLink,
  description,
  itemType,
}) => {
  const handleClick = () => {
    // You can customize the behavior when the image is clicked, such as navigating to the item link
    window.location.href = itemLink;
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <img
        src={imgSrc}
        alt={itemType}
        style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
        onClick={handleClick}
      />
      <div>
        <p>{description}</p>
        <p>Type: {itemType}</p>
      </div>
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
                    {/* <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 h-10 w-64 ml-10 ...">
            
                    </div> */}
{/* 
                    <div className="flex flex-col text-xs">
                            <span className="text-xl mt-4">Related Sources:</span>
                            {props.map((article, index) => (
                                <div className=" border border-white rounded-lg p-4 mb-2" key={index}>
                                    <a key={index} href={article.link} className="text-white hover:underline" target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                    </a>
                                </div>
                            ))}
                    </div> */}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {Object.entries(props).map(([category, items]) => (
                            <div key={category}>
                            <h2>{category}</h2>
                            {items.map((item, index) => (
                                <TwitterCard key={index} {...item} />
                            ))}
                            </div>
                        ))}
                    </div>


            </CardContent>
    </Card>
 )
}