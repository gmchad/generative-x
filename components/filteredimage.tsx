import React, {useEffect, useState} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {FilterId, getImageFilter} from "@/components/filters";


export function FilteredImage(props: {
    imageUrl: string;
    filterId: FilterId | null;
    altText: string;
    className: string
}) {

    // find the style
    const {imageUrl} = props;
    const styleText: string | null = getImageFilter(props.filterId);

    // state
    const [loading, setLoading] = useState(false);
    const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);


    useEffect(() => {
        if (!imageUrl || !styleText)
            return;

        // Set loading to true to show the skeleton
        setLoading(true);

        // Construct the endpoint URL with provided imageUrl and filterId
        const endpoint = `https://spc-openai-hackathon-backend.onrender.com/filter_image?image_url=${encodeURIComponent(imageUrl)}&new_filter=${encodeURIComponent(styleText)}`;

        // Call the endpoint to get the filtered image
        const abortController = new AbortController();
        fetch(endpoint, {signal: abortController.signal})
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API returns a JSON object with a property 'filteredImageUrl' that contains the URL of the filtered image
                console.log('out', data);
                if (data.url) {
                    setFilteredImageUrl(data.url);
                } else {
                    // Handle case where the API response does not contain the expected property
                    console.error('API response does not contain filteredImageUrl.');
                }
            })
            .catch((error) => {
                console.error('Error fetching filtered image:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false to hide the skeleton
            });

        // Cleanup the fetch request if the component unmounts
        return () => abortController.abort();
    }, [imageUrl, styleText]);

    // No style: pic as-is
    if (!styleText)
        return <picture><img src={imageUrl} alt={props.altText} className={props.className}/></picture>;

    // Has filtered image url: render that
    if (filteredImageUrl)
        return <picture><img src={filteredImageUrl} alt={props.altText} className={props.className}/></picture>;

    // Skeleton
    return <div className="mt-2">
        {loading ? <Skeleton className="h-48 w-full rounded-lg"/> : `Issue filtering image ${styleText}`}
    </div>;
}
