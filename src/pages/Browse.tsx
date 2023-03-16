import React, { useCallback, useEffect, useState } from 'react';
import { DogCard, Filter } from '../components';
import { Dog, IDog, ILoadDogsQueryParams } from '../interfaces';
import { loadDogsHelper, loadMatchHelper } from '../helpers';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [match, setMatch] = useState<Dog>();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [queryParams, setQueryParams] = useState<ILoadDogsQueryParams>({
        breeds: [],
        zipCodes: [],
        ageMin: 0,
        ageMax: 100,
        size: 5, // reset to 25
        from: '',
        sort: ''
    });

    /** Section: API Calls */
    const loadDogsCallback = useCallback(async() => {
        try {
            const dogs = await loadDogsHelper(queryParams);
            setDogs(dogs);

        } catch (err) {
            console.log('caught error');
        }
    }, [queryParams]);

    async function loadMatch() {
        try {
            const match = await loadMatchHelper(favorites);
            setMatch(match);
        } catch (err) {

        }
    }

    /** Section: useEffect */
    useEffect(() => {
    }, []);

    useEffect(() => {
        loadDogsCallback();
    }, [loadDogsCallback]);

    /** Section: Callbacks */
    function toggleFavorite(dogID: string): void {
        if (favorites.indexOf(dogID) > -1) {
            // already in the array
            setFavorites(favorites.filter((value) => value !== dogID));
        } else {
            // not in the array
            setFavorites([dogID, ...favorites]);
        }
    }

    function updateQueryParams(queryParams: ILoadDogsQueryParams): void {
        setQueryParams(queryParams);
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
        <Container>
            <Row>
                <Col>
                     <Filter queryParams={queryParams} updateQueryParams={updateQueryParams} />
                </Col>
                <Col>
                    <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
                </Col>
                <Col>
                    <Button onClick={handleRefreshSearch} variant='primary'>Refresh</Button>
                </Col>
            </Row>

            <Row>
                {match ?
                    <DogCard dog={match} toggleFavorite={toggleFavorite} isFavorite={true} />
                : null
                }
            </Row>
            <Row>

                {dogs.map((dog, index) => {
                    const isFavorite = favorites.indexOf(dog.id) > -1 ? true : false;
                    if (favorites.indexOf(dog.id) >- 1) {
                        dog.isFavorite = true;
                    }
                    return (
                        <DogCard dog={dog} toggleFavorite={toggleFavorite} isFavorite={isFavorite} key={index} />
                    )
                })}
            </Row>
        </Container>
    )
}