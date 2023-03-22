import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IRedirectModalProps {
    showRedirectModal: boolean
}

export function RedirectModal({showRedirectModal}: IRedirectModalProps) {
    const navigate = useNavigate();

    function closeRedirectModal() {
        navigate('/login');
    }

    return (
        <Modal show={showRedirectModal} onHide={closeRedirectModal} bg='light' delay={3000} autohide>
            <Modal.Header closeButton>
                <strong className='me-auto'>You've been signed out.</strong>
            </Modal.Header>
            <Modal.Body>
                Please log in again.
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant='secondary'>Go Home</Button> */}
                <Button variant='primary' onClick={closeRedirectModal}>Log in</Button>
            </Modal.Footer>
        </Modal>
    );
}