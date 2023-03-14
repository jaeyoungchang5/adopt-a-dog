import React, { useEffect, useState } from 'react';
import { DogCard } from '../components';
import { IDog, IDogSearchResults } from '../interfaces';
import { getBreeds, getDogs, searchDogs } from '../middleware';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    const [dogs, setDogs] = useState<IDog[]>();
    useEffect(() => {
        loadBreeds();
        loadDogs();
    }, []);

    async function loadBreeds() {
        try {
            const data = await getBreeds();
            console.log(data);
        } catch (err) {
            
        }
    }

    async function loadDogs() {
        try {
            const searchResults: IDogSearchResults = await searchDogs(true);
            const dogs = await getDogs(searchResults.resultIds);
            setDogs(dogs);

        } catch (err) {

        }
    }

    return (
        <div>
            {dogs?.map((dog, index) => {
                return (
                    <DogCard dog={dog} />
                )
            })}
        </div>
    )
}