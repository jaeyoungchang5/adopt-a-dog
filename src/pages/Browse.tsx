import React, { useCallback, useEffect, useState } from 'react';
import { DogCard, Filter, Sort } from '../components';
import { Dog, IDog, Location, ILocations, ILoadDogsQueryParams } from '../interfaces';
import { loadDogsHelper, loadLocationsHelper, loadMatchHelper } from '../helpers';
import { Button, Col, Container, Row, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [locations, setLocations] = useState<ILocations>({});
    const [match, setMatch] = useState<Dog>();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [queryParams, setQueryParams] = useState<ILoadDogsQueryParams>({
        breeds: [],
        zipCodes: [],
        ageMin: 0,
        ageMax: 100,
        size: 5, // reset to 25
        from: '',
        sort: ''
    });

    const navigate = useNavigate();

    /** Section: API Calls */
    const loadDogsCallback = useCallback(async() => {
        try {
            const newDogs = await loadDogsHelper(queryParams);
            setDogs(newDogs);
        } catch (err) {
            setShowToast(true);
        }
    }, [queryParams]);

    const loadLocationsCallback = useCallback(async() => {
        try {
            await loadLocationsHelper(dogs, locations, updateLocation);
            console.log(Object.keys(locations).length + ' locations!');
        } catch (err) {

        }
    }, [dogs, locations]);

    async function loadMatch() {
        try {
            const newMatch = await loadMatchHelper(favorites);
            setMatch(newMatch);
        } catch (err) {

        }
    }

    /** Section: useEffect */
    useEffect(() => {
        loadLocationsCallback();
    }, [loadLocationsCallback]);

    useEffect(() => {
        loadDogsCallback();
    }, [loadDogsCallback]);

    /** Section: Callback Functions */
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

    function updateLocation(location: Location) {
        setLocations((prev) => {
            return {
                ...prev,
                [location.zip_code]: location
            }
        })
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

    function closeToast() {
        setShowToast(false);
        navigate('/login');
    }

    return (
        <Container className='browser'>

            <RedirectToast showToast={showToast} closeToast={closeToast} />

            <Row>
                <Col>
                     <Filter queryParams={queryParams} updateQueryParams={updateQueryParams} />
                </Col>
                <Col>
                     <Sort />
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
                    if (locations[dog.zip_code]) {
                        dog.city = locations[dog.zip_code].city;
                        dog.state = locations[dog.zip_code].state;
                    }
                    return (
                        <DogCard dog={dog} toggleFavorite={toggleFavorite} isFavorite={isFavorite} key={index} />
                    )
                })}
            </Row>
        </Container>
    )
}

interface IRedirectToastProps {
    showToast: boolean,
    closeToast: () => void
}

function RedirectToast({showToast, closeToast}: IRedirectToastProps) {
    return (
        <ToastContainer position='top-center'>
            <Toast show={showToast} onClose={closeToast} bg='light' delay={3000} autohide>
                <Toast.Header>
                    <strong className='me-auto'>You have been signed out.</strong>
                </Toast.Header>
                <Toast.Body>
                    Please log in again.
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}