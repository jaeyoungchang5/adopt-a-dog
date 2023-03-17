const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export async function getLocations(zipCodes: number[]) {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/locations', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY },
        body: JSON.stringify(zipCodes)
    });
    if (!res.ok) {
        throw new Error('Bad request');
    }
    return res.json();
}