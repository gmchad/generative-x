export type FilterId = 'anime' | 'cyberpunk';

export const Filters: { [id in FilterId]: { name: string; imageFilter: string } } = {
    'anime': {
        name: 'Anime',
        imageFilter: 'Anime, like Demon Slayer'
    },
    'cyberpunk': {
        name: 'Cyberpunk',
        imageFilter: 'Cyberpunk, like Blade Runner'
    },
}

// used by the UI to display the filters list up top
export const FiltersList: { name: string, id: FilterId | null }[] = Object.keys(Filters).map((key) => ({
    name: Filters[key as FilterId].name,
    id: key as FilterId
}));
FiltersList.unshift({name: 'Serious Mode', id: null});

export function getImageFilter(filterId: FilterId | null): string | null {
    return filterId ? Filters[filterId].imageFilter ?? null : null;
}