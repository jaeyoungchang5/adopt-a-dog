import { IUser } from '../interfaces';
const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export function login(user: IUser) {
    return fetch(REACT_APP_FETCH_BACKEND_API + '/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY},
        body: JSON.stringify(user)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error ('Bad credentials');
        }
    })
}