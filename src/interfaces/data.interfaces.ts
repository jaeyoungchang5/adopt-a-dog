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

export interface Location {
    zip_code: number,
    latitude: number,
    longitude: number,
    city: string,
    state: string,
    county: string
}

export interface ILocations {
    [key: number]: Location
}

export interface IDog extends Dog {
    city?: string,
    state?: string
}

export interface Match {
    match: string
}