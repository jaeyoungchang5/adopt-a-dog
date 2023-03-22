import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dog } from '../interfaces';
import { getDogs } from '../middleware';

interface IMatchCardProps {
    matchID: string
}

export function MatchCard({ matchID }: IMatchCardProps) {
    const [match, setMatch] = useState<Dog>();
    useEffect(() => {
        async function fetchMatch() {
            const dogs: Dog[] = await getDogs([matchID]);
            if (dogs[0]) {
                setMatch(dogs[0]);
            }
        }

        fetchMatch();

    }, [matchID]);
    /** 
     * If no match, replace to browse page
     * Might have to use URL parameters to get name, breed, age, 
     */
    
    return (
        <>
            { matchID && match ? 
                <p>{match.name}</p>
            : <p>No match found</p> }
        </>
    )
}