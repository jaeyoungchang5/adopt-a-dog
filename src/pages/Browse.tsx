import React, { useCallback, useEffect, useState } from 'react';
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

    /** Section: API Calls */
    const loadDogsCallback = useCallback(async() => {
        try {
            const dogs = await loadDogsHelper(queryParams);
            setDogs(dogs);

        } catch (err) {
            console.log('caught error');
        }
    }, [queryParams]);

    async function loadBreeds() {
        try {
            const data = await getBreeds();
            setBreeds(data);
        } catch (err) {
            
        }
    }

    async function loadMatch() {
        try {
            const match = await loadMatchHelper(favorites);
            console.log(favorites);
            console.log(match);
        } catch (err) {

        }
    }

    /** Section: useEffect */
    useEffect(() => {
        setQueryParams({
            size: 5
        })
        loadBreeds();
    }, []);

    useEffect(() => {
        loadDogsCallback();
    }, [loadDogsCallback, queryParams]);

    /** Section: Functions */
    function toggleFavorite(dogID: string): void {
        if (favorites.indexOf(dogID) > -1) {
            // already in the array
            setFavorites(favorites.filter((value) => value !== dogID));
        } else {
            // not in the array
            setFavorites([dogID, ...favorites]);
        }
    }

    /** Section: Handlers */
    function handleRefreshSearch() {
        loadDogsCallback();
    }

    function handleMatchClick() {
        if (favorites.length === 0) {
            return;
        }
        loadMatch();
    }

    return (
        <div>
            <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
            <Button onClick={handleRefreshSearch} variant='primary'>Refresh</Button>

            {dogs.map((dog, index) => {
                const isFavorite = favorites.indexOf(dog.id) > -1 ? true : false;
                if (favorites.indexOf(dog.id) >- 1) {
                    dog.isFavorite = true;
                }
                return (
                    <DogCard dog={dog} toggleFavorite={toggleFavorite} isFavorite={isFavorite} key={index} />
                )
            })}
        </div>
    )
}