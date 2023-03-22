import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dog } from '../interfaces';
import { MatchCard } from '../components';

interface IMatchProps {
    matchID: string
}

export function Match({ matchID }: IMatchProps) {
    /** 
     * If no match, replace to browse page
     * Might have to use URL parameters to get name, breed, age, 
     */
    
    return (
        <MatchCard matchID={matchID} />
    )
}