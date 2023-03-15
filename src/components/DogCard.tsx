import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IDog } from '../interfaces';

interface IDogCardProps {
    dog: IDog,
    toggleFavorite: (dogID: string) => void
}

export function DogCard({ dog, toggleFavorite }: IDogCardProps) {

    function handleToggleFavorite() {
        toggleFavorite(dog.id);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={dog.img} />
            <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>{dog.age}</Card.Text>
                <Card.Text>{dog.zip_code}</Card.Text>
                <Card.Text>{dog.breed}</Card.Text>
                <Button onClick={handleToggleFavorite} variant='primary'>Favorite</Button>
            </Card.Body>
        </Card>
    )
}