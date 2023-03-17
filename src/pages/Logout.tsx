import { useCallback, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../middleware';

interface ILogoutProps {}

export function Logout(props: ILogoutProps) {

    const navigate = useNavigate();

    const logoutCallback = useCallback(async() => {
        try {
            await logout();
        } catch (err) {
        }

        navigate('/login', {replace: true});
    }, [navigate]);

    useEffect(() => {
        logoutCallback();
    }, [logoutCallback]);


    return (
        <Spinner />
    )
}