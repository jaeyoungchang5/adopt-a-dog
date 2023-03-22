import { Nav, Navbar } from 'react-bootstrap';

interface INavigationProps {}

export function Navigation(props: INavigationProps) {
    return (
        <div>
            <Navbar id="nav" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href='/'>
                    <img alt='Adopt A Dog' src={`${process.env.PUBLIC_URL}/images/adopt-a-dog.png`} />
                    Adopt A Dog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/browse'>Browse</Nav.Link>
                        <Nav.Link href='/login'>Login</Nav.Link>
                        <Nav.Link href='/logout'>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}