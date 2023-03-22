import React, { useCallback, useEffect, useState } from 'react';
import { DogCard, Filter, Sort, PaginationComponent as Pagination } from '../components';
import { Dog, IDog, Location, ILocations, ILoadDogsQueryParams, IDogSearchResults } from '../interfaces';
import { loadLocationsHelper, loadMatchHelper } from '../helpers';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { searchDogs, getDogs } from '../middleware';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [locations, setLocations] = useState<ILocations>({});
    const [match, setMatch] = useState<Dog>();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<IDogSearchResults>({
        resultIds: [],
        total: 10000, // default max number of dog results
        next: '',
        prev: ''
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParams, setQueryParams] = useState<ILoadDogsQueryParams>({
        breeds: [],
        zipCodes: [],
        ageMin: 0,
        ageMax: 100,
        size: 6, // reset to 25
        from: 0,
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

    async function loadDogsHelper(loadDogsQueryParams?: ILoadDogsQueryParams) {
        const searchResults: IDogSearchResults = await searchDogs(loadDogsQueryParams);
        setSearchResults(searchResults);
        const dogs: Dog[] = await getDogs(searchResults.resultIds);
        return dogs;
    }

    /** Section: useEffect */
    useEffect(() => {
        loadLocationsCallback();
    }, [loadLocationsCallback]);

    useEffect(() => {
        loadDogsCallback();
    }, [loadDogsCallback]);

    useEffect(() => {
        setQueryParams(prev => {
            return {
                ...prev,
                from: ((currentPage-1)*prev.size)
            }
        })
    }, [currentPage]);

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
        });
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
        <div className='browse'>

            <RedirectToast showToast={showToast} closeToast={closeToast} />

            <div className='optionsBar'>
                <Button onClick={handleRefreshSearch} variant='primary'>Refresh</Button>
                <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
                <Filter queryParams={queryParams} updateQueryParams={updateQueryParams} />
                <Sort />
                <Pagination itemsCount={searchResults.total} itemsPerPage={queryParams.size} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

            <div className='dogCards'>
                 {match ?
                    <DogCard dog={match} toggleFavorite={toggleFavorite} isFavorite={true} />
                : null
                }
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
            </div>

            <Pagination itemsCount={searchResults.total} itemsPerPage={queryParams.size} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
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
    );
}