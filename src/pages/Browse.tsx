import React, { useEffect, useState } from 'react';
import { DogCard } from '../components';
import { Dog, IDog, ILoadDogsQueryParams } from '../interfaces';
import { getBreeds } from '../middleware';
import { loadDogsHelper, loadMatchHelper } from '../helpers';
import { Button } from 'react-bootstrap';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [match, setMatch] = useState<Dog>();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [queryParams, setQueryParams] = useState<ILoadDogsQueryParams>({});

    useEffect(() => {
        loadBreeds();
    }, []);

    useEffect(() => {
        loadDogs();
    }, [queryParams]);

    function toggleFavorite(dogID: string): void {
        if (favorites.indexOf(dogID) > -1) {
            // already in the array
            setFavorites(favorites.filter((value) => value !== dogID));
        } else {
            // not in the array
            setFavorites([dogID, ...favorites]);
        }
        console.log(favorites);
    }

    async function handleMatchClick() {
        if (favorites.length === 0) {
            return;
        }
        try {
            const match = await loadMatchHelper(favorites);
            console.log(match);
        } catch (err) {

        }
    }

    function handleRefreshSearch() {
        loadDogs();
    }

    async function loadBreeds() {
        try {
            const data = await getBreeds();
            setBreeds(data);
        } catch (err) {
            
        }
    }

    async function loadDogs() {
        try {
            const dogs = await loadDogsHelper(queryParams);
            setDogs(dogs);

        } catch (err) {
            console.log('caught error');
        }
    }

    return (
        <div>
            <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
            <Button onClick={handleRefreshSearch} variant='primary'>Refresh</Button>

            {dogs.map((dog, index) => {
                return (
                    <DogCard dog={dog} toggleFavorite={toggleFavorite} key={index} />
                )
            })}
        </div>
    )
}