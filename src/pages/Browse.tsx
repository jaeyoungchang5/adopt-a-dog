import React, { useCallback, useEffect, useState } from 'react';
import { DogCard, Filter, Sort, PaginationComponent as Pagination, RedirectModal } from '../components';
import { Dog, IDog, Location, ILocations, ILoadDogsQueryParams, IDogSearchResults, Match } from '../interfaces';
import { loadLocationsHelper } from '../helpers';
import { Button } from 'react-bootstrap';
import { searchDogs, getDogs, getMatch } from '../middleware';
import { MatchModal } from '../components/MatchModal';

interface IBrowsePageProps {}

export function Browse(props: IBrowsePageProps) {
    /** Section: States */
    const [dogs, setDogs] = useState<IDog[]>([]);
    const [locations, setLocations] = useState<ILocations>({});
    const [matchID, setMatchID] = useState<string>('');
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
    const [showRedirectModal, setShowRedirectModal] = useState<boolean>(false);
    const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

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
            setShowRedirectModal(true);
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
            const match: Match = await getMatch(favorites);
            setMatchID(match.match);
            setShowMatchModal(true);
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

    function closeMatchModal() {
        setShowMatchModal(false);
    }

    return (
        <div className='browse'>

            <RedirectModal showRedirectModal={showRedirectModal} />
            <MatchModal matchID={matchID} showMatchModal={showMatchModal} closeMatchModal={closeMatchModal} />

            <div className='optionsBar'>
                <Button onClick={handleSearchClick} variant='primary'>Search</Button>
                <Button onClick={handleMatchClick} variant='primary'>Match Me</Button>
                <Filter queryParams={queryParams} updateQueryParams={updateQueryParams} />
                <Sort />
                {/* <Pagination itemsCount={searchResults.total} itemsPerPage={queryParams.size} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
            </div>

            <div className='dogCards'>
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
