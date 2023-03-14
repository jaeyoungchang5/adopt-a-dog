export interface IUser {
    name: string,
    email: string
}

export interface IDog {
    id: string,
    img: string,
    name: string,
    age: number,
    zip_code: number,
    breed: string,
}

export interface IDogSearchResults {
    resultIds: string[],
    total: number,
    next: string,
    prev: string
}