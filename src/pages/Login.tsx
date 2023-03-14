
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { login } from '../middleware';
import { IUser } from '../interfaces';

interface ILoginPageProps {}

export function Login(props: ILoginPageProps) {
	const [user, setUser] = useState<IUser>({
		name: '',
		email: ''
	});

	function handleChange(event: any) {
        const { name, value } = event.target;
		setUser(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			await login(user);
		} catch (err) {
			alert(err);
		}
	}

	return (
        <Form>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={user.name} placeholder='Name' name='name' onChange={handleChange} autoComplete='off' />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type='Email' value={user.email} placeholder='Email' name='email' onChange={handleChange} autoComplete='off' />
            </Form.Group>
            
            <Button onClick={handleSubmit} variant="primary" type="submit">
                Log In
            </Button>
        </Form>
	)
}