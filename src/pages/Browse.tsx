import React, { useEffect, useState } from 'react';
import { DogCard } from '../components';
import { IDog } from '../interfaces';
import { getBreeds, loadDogsHelper } from '../middleware';

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
            const dogs = await loadDogsHelper();
            setDogs(dogs);

        } catch (err) {
            console.log('caught error');
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