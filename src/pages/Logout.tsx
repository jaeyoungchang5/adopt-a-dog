import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../middleware';

interface ILogoutProps {}

export function Logout(props: ILogoutProps) {

    const navigate = useNavigate();

    useEffect(() => {
        try {
            logout().then(() => {
                navigate('/', {replace: true});
            })
        } catch (err) {
            
        }
    }, [navigate]);

    return (
        <Spinner />
    )
}