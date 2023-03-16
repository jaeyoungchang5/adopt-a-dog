import { Dog, IDogSearchResults, ILoadDogsQueryParams, Match } from '../interfaces';
import { getDogs, getMatch, searchDogs } from '../middleware';

export async function loadDogsHelper(loadDogsQueryParams?: ILoadDogsQueryParams) {
    const searchResults: IDogSearchResults = await searchDogs(loadDogsQueryParams);
    console.log('Search yielded ' + searchResults.total + ' results')
    const dogs: Dog[] = await getDogs(searchResults.resultIds);
    return dogs;
}

export async function loadMatchHelper(dogIDs: string[]) {
    const match: Match = await getMatch(dogIDs);
    const dogs: Dog[] = await getDogs([match.match]);
    return dogs[0];
}

export function formatUrlParams(params: ILoadDogsQueryParams | undefined) {
    const queryStrings = [];

    if (!params) {
        return;
    }

    if (params.breeds.length > 0) {
        for (let breed of params.breeds) {
            queryStrings.push(`breeds=${breed}&`)
        }
    }

    if (params.zipCodes) {

    }

    if (params.ageMax) {

    }

    if (params.ageMin) {

    }
    
    if (params.size) {
        queryStrings.push('size=' + params.size, '&');
    }

    if (params.from) {

    }

    if (params.sort) {

    }


    return ['?', ...queryStrings].join('');
}