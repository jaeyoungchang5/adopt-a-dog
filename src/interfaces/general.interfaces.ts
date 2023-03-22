export interface ILoadDogsQueryParams {
    breeds: string[],
    zipCodes: number[],
    ageMin: number,
    ageMax: number,
    size: number,
    from: number,
    sort: string
}

export interface IDogSearchResults {
    resultIds: string[],
    total: number,
    next: string,
    prev: string
}

export interface IFilterOptions {
	Clear: boolean,
    Breeds: string[],
    Color: string[],
    For: string[]
}