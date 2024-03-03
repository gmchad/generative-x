import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {FilterId, getImageFilter} from "@/components/filters";


// Initialize a cache outside of the component
const clientSideImageCache = new Map();


export function FilteredImage(props: {
    imageUrl: string;
    filterId: FilterId | null;
    altText: string;
    className: string
}) {

    // find the style
    const {imageUrl} = props;
    const styleText = getImageFilter(props.filterId);

    // state
    const [loading, setLoading] = React.useState(false);
    const [filteredImageUrl, setFilteredImageUrl] = React.useState<string | null>(null);


    React.useEffect(() => {
        if (!imageUrl || !styleText) {
            setLoading(false);
            return;
        }

        // retrieve from cache, if available
        const cacheKey = `${imageUrl}_${styleText}`;
        const cachedUrl = clientSideImageCache.get(cacheKey);
        if (cachedUrl) {
            // If the image is found in the cache, use it and skip fetching
            setFilteredImageUrl(cachedUrl);
            return;
        }

        const _ac = new AbortController();

        async function getFilteredImage(srcUrl: string, dstStyle: string, ac: AbortController) {
            // Set loading to true to show the skeleton
            setLoading(true);

            // Construct the endpoint URL with provided imageUrl and filterId
            const endpoint = `https://spc-openai-hackathon-backend.onrender.com/filter_image?image_url=${encodeURIComponent(srcUrl)}&new_filter=${encodeURIComponent(dstStyle)}`;

            // Call the endpoint to get the filtered image
            try {

                const response = await fetch(endpoint);
                const data = await response.json();

                if (!data.url || !data.url?.startsWith('http')) {
                    console.error('API response does not contain filteredImageUrl.', data);
                    return;
                }

                // Save the fetched URL to the cache
                clientSideImageCache.set(cacheKey, data.url);

                // replace the image in the UI only if the client hasn't moved on since
                if (!ac.signal.aborted)
                    setFilteredImageUrl(data.url);
            } catch (error) {
                console.error('Error fetching filtered image:', error);
            }

            // disable the loading indicator
            if (!ac.signal.aborted)
                setLoading(false);
        }

        const timeoutId = setTimeout(() => getFilteredImage(imageUrl, styleText, _ac), 0);
        return () => {
            _ac.abort();
            setLoading(false);
            clearTimeout(timeoutId);
        };

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