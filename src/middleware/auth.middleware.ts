import { User } from '../interfaces';
const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export async function login(user: User) {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY },
        body: JSON.stringify(user)
    });
    if (!res.ok) {
        throw new Error('Bad credentials');
    }
}

export async function logout() {
    const res = await fetch(REACT_APP_FETCH_BACKEND_API + '/auth/logout', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY }
    });
    if (!res.ok) {
        throw new Error('Bad credentials');
    }
}