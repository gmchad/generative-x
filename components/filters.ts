export type FilterId = 'anime' | 'cyberpunk' | 'cheese' | 'candy' | 'disgusting';

// Reimagine the following prompt if it were filtered like ${filter}: ${prompt}
export const Filters: { [id in FilterId]: { name: string; imageFilter: string; responseAdjectives: string, voiceId?: string } } = {
    'anime': {
        name: '🌸 Anime', // 🌸🍙😸
        // imageFilter: 'Anime, like Demon Slayer',
        imageFilter: 'anime with immersive visuals and emotional richness, preserving the subject',
        // imageFilter: 'shojo anime style, in soft colors, flowery details, and use of color to evoke emotion',
        responseAdjectives: 'kawaii, cute',
    },
    'cyberpunk': {
        name: '🌆 Cyberpunk',
        // imageFilter: 'Cyberpunk, like Blade Runner',
        imageFilter: 'cyberpunk style with neon-drenched aesthetic, mirroring Blade Runner\' dystopian future',
        responseAdjectives: 'gen-z, braindead',
        voiceId: 'Pqfiihpuz4Fl2QsVF9rg', // Elon Musk
    },
    'candy': { // Perfect
        name: '🦄',
        imageFilter: 'unicorns in a dreamy world made of pink cotton candy, preserving the subjects',
        responseAdjectives: 'enchanting, whimsical, fluffy',
    },
    'cheese': {
        name: '🧀',
        imageFilter: 'cheese fantasy with subjects preserved, set against richly textured, colorful cheese-themed backdrops',
        responseAdjectives: 'cheesy, cheesy, as if spoken by a cheese lover',
    },
    'disgusting': { // Perfect
        name: '🤮',
        imageFilter: 'disgusting, gruesome, repulsive, icky',
        responseAdjectives: 'disgusting, gross, repulsive',
    },
}

// used by the UI to display the filters list up top
export const FiltersList: { name: string, id: FilterId | null }[] = Object.keys(Filters).map((key) => ({
    name: Filters[key as FilterId].name,
    id: key as FilterId
}));
FiltersList.unshift({name: 'Serious', id: null});

export function getImageFilter(filterId: FilterId | null): string | null {
    return filterId ? Filters[filterId].imageFilter ?? null : null;
}

export function getResponseAdjectives(filterId: FilterId | null): string | null {
    return filterId ? Filters[filterId].responseAdjectives ?? null : null;
}

export function getFilterVoiceId(filterId: FilterId | null): string | null {
    return filterId ? Filters[filterId].voiceId ?? null : null;
}