import React from 'react';
import { Card } from 'react-bootstrap';
import { IDog } from '../interfaces';

interface IDogCardProps {
    dog: IDog
}

export function DogCard({dog}: IDogCardProps) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant='top' src={dog.img} />
            <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>{dog.age}</Card.Text>
                <Card.Text>{dog.zip_code}</Card.Text>
                <Card.Text>{dog.breed}</Card.Text>
            </Card.Body>
        </Card>
    )
}