interface IUser {
    name: string,
    email: string
}

const { REACT_APP_FETCH_BACKEND_API = '', REACT_APP_FETCH_API_KEY = '' } = process.env;

export function login(user: IUser) {
    console.log(REACT_APP_FETCH_BACKEND_API + '- ' + REACT_APP_FETCH_API_KEY)
    console.log(user);
    return fetch(REACT_APP_FETCH_BACKEND_API + '/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'fetch-api-key': REACT_APP_FETCH_API_KEY},
        body: JSON.stringify(user)
    })
    .then(res => {
        console.log(res);
        if (res.ok) return;
        throw new Error ('Bad credentials');
    })
}