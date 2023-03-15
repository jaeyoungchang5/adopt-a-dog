import { formatUrlParams } from '../helpers';
import { ILoadDogsQueryParams } from '../interfaces';

const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export async function getDogs(dogIDs: string[]) {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/dogs', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY },
        body: JSON.stringify(dogIDs)
    });
    if (!res.ok) {
        throw new Error('Bad request');
    }
    return res.json();
}

export async function searchDogs(loadDogsQueryParams?: ILoadDogsQueryParams) {
    const queryString = formatUrlParams(loadDogsQueryParams);
    console.log(REACT_APP_FETCH_BACKEND_API + '/dogs/search' + queryString)
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/dogs/search' + queryString, {
        credentials: 'include',
        headers: { 'fetch-api-key': REACT_APP_FETCH_API_KEY }
    });
    if (!res.ok) {
        throw new Error('Bad request');
    }
    return res.json();
}

export async function getBreeds() {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/dogs/breeds', {
        credentials: 'include',
        headers: { 'fetch-api-key': REACT_APP_FETCH_API_KEY },
    });
    if (!res.ok) {
        throw new Error('Bad request');
    }
    return res.json();
}

export async function getMatch(dogIDs: string[]) {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/dogs/match', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY },
        body: JSON.stringify(dogIDs)
    });
    if (!res.ok) {
        throw new Error('Bad request');
    }
    return res.json();
}