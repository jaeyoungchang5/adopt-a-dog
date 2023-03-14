const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export function getDogs(dogIDs: string[]) {
    return fetch(REACT_APP_FETCH_BACKEND_API + '/dogs', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY},
        body: JSON.stringify(dogIDs)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error ('Bad request');
        }
        return res.json();
    })
}

export function searchDogs(sort: boolean) {
    return fetch(REACT_APP_FETCH_BACKEND_API + '/dogs/search', {
        credentials: 'include',
        headers: {'fetch-api-key': REACT_APP_FETCH_API_KEY}
    })
    .then(res => {
        if (!res.ok) {
            throw new Error ('Bad request');
        }
        return res.json();
    })
}

export function getBreeds() {
    return fetch(REACT_APP_FETCH_BACKEND_API + '/dogs/breeds', {
        credentials: 'include',
        headers: {'fetch-api-key': REACT_APP_FETCH_API_KEY},
    })
    .then(res => {
        if (!res.ok) {
            throw new Error ('Bad request');
        }
        return res.json();
    })
}