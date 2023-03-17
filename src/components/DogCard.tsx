import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IDog } from '../interfaces';
interface IDogCardProps {
    dog: IDog,
    toggleFavorite: (dogID: string) => void,
    isFavorite: boolean
}

export function DogCard({ dog, toggleFavorite, isFavorite }: IDogCardProps) {
    function handleToggleFavorite() {
        toggleFavorite(dog.id);
    }

    return (
        <div className='dogCard'>
        <Card>
            <Card.Img variant='top' src={dog.img} className='dogImage' />
            <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>{dog.age} {dog.age === 1 ? 'year' : 'years'} old</Card.Text>
                { (dog.city && dog.state) ? 
                    <Card.Text>{dog.city}, {dog.state}</Card.Text>
                :
                    <Card.Text>Zip Code: {dog.zip_code}</Card.Text>
                }
                <Card.Text>{dog.breed}</Card.Text>
                <Button onClick={handleToggleFavorite} variant={isFavorite ? 'warning' : 'primary'}>Favorite</Button>
            </Card.Body>
        </Card>
        </div>
    )
}