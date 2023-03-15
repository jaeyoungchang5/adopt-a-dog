import { Dog, IDogSearchResults, ILoadDogsQueryParams, Match } from '../interfaces';
import { getDogs, getMatch, searchDogs } from '../middleware';

export async function loadDogsHelper(loadDogsQueryParams?: ILoadDogsQueryParams) {
    const searchResults: IDogSearchResults = await searchDogs(loadDogsQueryParams);
    const dogs: Dog[] = await getDogs(searchResults.resultIds);
    return dogs;
}

export async function loadMatchHelper(dogIDs: string[]) {
    const match: Match = await getMatch(dogIDs);
    const dogs: Dog[] = await getDogs([match.match]);
    return dogs[0];
}

export function formatUrlParams(params?: ILoadDogsQueryParams) {
    const queryStrings = ['?'];
    if (params?.size) {
        queryStrings.push('size=' + params.size);
    }

    return queryStrings.join('');
}