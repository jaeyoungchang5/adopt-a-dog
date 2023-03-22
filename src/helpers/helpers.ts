import { Dog, Location, ILocations, ILoadDogsQueryParams, Match } from '../interfaces';
import { getDogs, getLocations, getMatch } from '../middleware';

export async function loadLocationsHelper(dogs: Dog[], existingLocations: ILocations, updateLocation: (location: Location) => void) {
    const zipCodes: number[] = [];
    for (const dog of dogs) {
        if (existingLocations[dog.zip_code]) {
            continue;
        }
        zipCodes.push(dog.zip_code);
    }
    const locations = await getLocations(zipCodes);
    for (const location of locations) {
        if (!location) {
            continue;
        }
        updateLocation(location);
    }
}

export async function loadMatchHelper(dogIDs: string[]) {
    const match: Match = await getMatch(dogIDs);
    const dogs: Dog[] = await getDogs([match.match]);
    return dogs[0];
}

export function formatUrlParams(params: ILoadDogsQueryParams | undefined): string {
    const queryStrings = [];

    if (!params) {
        return '';
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
        queryStrings.push(`size=${params.size}&`)
    }

    if (params.from > -1) {
        queryStrings.push(`from=${params.from}&`)
    }

    if (params.sort) {
        queryStrings.push(`sort=${params.sort}&`)
    }


    return ['?', ...queryStrings].join('');
}