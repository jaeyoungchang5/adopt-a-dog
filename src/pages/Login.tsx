import { useState } from 'react';
import { Button, Container, Form, ToastContainer } from 'react-bootstrap';
import { login } from '../middleware';
import { User } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

interface ILoginPageProps {}

export function Login(props: ILoginPageProps) {
	const [user, setUser] = useState<User>({
		name: '',
		email: ''
	});
    const [showToast, setShowToast] = useState<boolean>(false);

    const navigate = useNavigate();

	function handleChange(event: any) {
        const { name, value } = event.target;
		setUser(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    function toggleToast() {
        setShowToast(!showToast);
    }

	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			await login(user);
            navigate('/browse')
		} catch (err) {
			toggleToast();
		}
	}

	return (
        <Container>
            <LoginToast showToast={showToast} toggleToast={toggleToast} />
            
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
        </Container>
	)
}

interface ILoginToastProps {
    showToast: boolean,
    toggleToast: () => void
}

function LoginToast({showToast, toggleToast}: ILoginToastProps) {
    return (
        <ToastContainer position='top-center'>
            <Toast show={showToast} onClose={toggleToast} bg='light' delay={3000} autohide>
                <Toast.Header>
                    <strong className='me-auto'>Login Failed</strong>
                </Toast.Header>
                <Toast.Body>
                    Please try again.
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}