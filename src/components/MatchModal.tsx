import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MatchCard } from './MatchCard';
import { useState, useEffect } from 'react';
import { Dog } from '../interfaces';
import { getDogs } from '../middleware';

interface IMatchModalProps {
    matchID: string,
    showMatchModal: boolean,
    closeMatchModal: () => void
}

export function MatchModal({matchID, showMatchModal, closeMatchModal}: IMatchModalProps) {
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

    const navigate = useNavigate();

    function goToMatchPage() {
    }

    return (
        <Modal show={showMatchModal} onHide={closeMatchModal} bg='light' delay={3000} autohide>
            <Modal.Header closeButton>
                <strong className='me-auto'>You've been matched!</strong>
            </Modal.Header>
            <Modal.Body>
                <MatchCard matchID={matchID} />
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant='secondary'>Go Home</Button> */}
                <Button variant='primary' onClick={goToMatchPage}>Open Match</Button>
            </Modal.Footer>
        </Modal>
    );
}