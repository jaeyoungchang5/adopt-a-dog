import React, { useCallback, useEffect, useState } from 'react';
import { DogCard, Filter, Sort, PaginationComponent as Pagination } from '../components';
import { Dog, IDog, Location, ILocations, ILoadDogsQueryParams, IDogSearchResults } from '../interfaces';
import { loadLocationsHelper, loadMatchHelper } from '../helpers';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { searchDogs, getDogs } from '../middleware';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    /** Section: States */
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [locations, setLocations] = useState<ILocations>({});
    const [match, setMatch] = useState<Dog>();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<IDogSearchResults>({
        resultIds: [],
        total: 10000, // default max number of dog results
        next: '',
        prev: ''
    });
    const [queryParams, setQueryParams] = useState<ILoadDogsQueryParams>({
        breeds: [],
        zipCodes: [],
        ageMin: 0,
        ageMax: 100,
        size: 6, // reset to 25
        from: 0,
        sort: 'name:asc' // default sort is ascending names
    });
    const [doSearch, setDoSearch] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const navigate = useNavigate();

    /** Section: API Calls */
    const loadDogsCallback = useCallback(async() => {
        if (!doSearch) {
            return;
        }
        try {
            const searchResults: IDogSearchResults = await searchDogs(queryParams);
            setSearchResults(searchResults);
            const dogs: Dog[] = await getDogs(searchResults.resultIds);
            setDogs(dogs);
            setDoSearch(false);
        } catch (err) {
            setShowModal(true);
        }
    }, [doSearch, queryParams]);

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
        });
        setDoSearch(true);
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
    function handleSearchClick() {
        setDoSearch(true);
    }

    function handleMatchClick() {
        if (favorites.length === 0) {
            return;
        }
        loadMatch();
    }

    function closeModal() {
        setShowModal(false);
        navigate('/login');
    }

    return (
        <div className='browse'>

            <RedirectModal showModal={showModal} closeModal={closeModal} />

            <div className='optionsBar'>
                <Button onClick={handleSearchClick} variant='primary'>Search</Button>
                <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
                <Filter queryParams={queryParams} updateQueryParams={updateQueryParams} />
                <Sort />
                {/* <Pagination itemsCount={searchResults.total} itemsPerPage={queryParams.size} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
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

interface IRedirectModalProps {
    showModal: boolean,
    closeModal: () => void
}

function RedirectModal({showModal, closeModal}: IRedirectModalProps) {
    return (
        <Modal show={showModal} onClose={closeModal} bg='light' delay={3000} autohide>
            <Modal.Header closeButton>
                <strong className='me-auto'>You have been signed out.</strong>
            </Modal.Header>
            <Modal.Body>
                Please log in again.
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant='secondary'>Go Home</Button> */}
                <Button variant='primary' onClick={closeModal}>Log in</Button>
            </Modal.Footer>
        </Modal>
    );
}