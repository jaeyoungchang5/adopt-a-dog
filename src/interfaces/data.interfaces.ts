export interface User {
    name: string,
    email: string
}

export interface Dog {
    id: string,
    img: string,
    name: string,
    age: number,
    zip_code: number,
    breed: string,
}

export interface IDog extends Dog {
    isFavorite?: boolean
}

export interface Match {
    match: string
}