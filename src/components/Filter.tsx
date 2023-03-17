import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { getBreeds } from '../middleware';
import { ILoadDogsQueryParams, IFilterOptions } from '../interfaces';

interface IFilterProps {
	queryParams: ILoadDogsQueryParams,
    updateQueryParams: (queryParams: ILoadDogsQueryParams) => void,
}

export function Filter({ queryParams, updateQueryParams }: IFilterProps) {
	const [filterMenuOptions, setFilterMenuOptions] = useState<IFilterOptions>({
		Clear: true,
		Breeds: [],
		Color: [],
		For: [],
	});
	const [selectedFilterOption, setSelFilterOption] = useState(
		Object.keys(filterMenuOptions)[0]
	);

	useEffect(() => {
		loadBreeds();
		setFilterMenuOptions(prev => {
			return {
				...prev,
				Color: ["Red", "Green", "Blue", "Black", "White"],
				For: ["Men", "Women", "Children", "Infants"]
			}
		})
	}, []);

	async function loadBreeds() {
        try {
            const data = await getBreeds();
            setFilterMenuOptions(prev => {
				return {
					...prev,
					Breeds: data
				};
			});
        } catch (err) {
            
        }
    }

	function handleBreedFilter(breed: string, isChecked: boolean) {
		breed = breed.split(' ').join('%20');
		if (isChecked) {
			updateQueryParams({
				...queryParams,
				breeds: [...queryParams.breeds, breed]
			})
		} else {
			updateQueryParams({
				...queryParams,
				breeds: queryParams.breeds.filter((val) => val !== breed)
			})
		}
	}

	return (
		<Dropdown>
			<Dropdown.Toggle variant="warning">Filter</Dropdown.Toggle>
			<Dropdown.Menu>
				<Container>
					<Row style={{ minWidth: "50vw" }}>
						<Col>
							<ListGroup variant="flush">
								{Object.keys(filterMenuOptions).map((fKey, id) => (
									<ListGroup.Item
										key={id}
										action
										active={selectedFilterOption === fKey}
										onClick={() => setSelFilterOption(fKey)}
										variant="success"
									>
										{fKey}
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
						<Col>
							{selectedFilterOption === 'Breeds' ?
								<ListGroup>
									{filterMenuOptions.Breeds.map((option: string, id: number) => (
										<Row key={id}>
											<Col xs="2">
												<input type="checkbox" onChange={(e) => handleBreedFilter(option, e.target.checked)} />
											</Col>
											<Col>
												<p>{option}</p>
											</Col>
										</Row>
									))}
								</ListGroup> : null
							}
						</Col>
					</Row>
				</Container>
			</Dropdown.Menu>
		</Dropdown>
	);
}