import { Nav, Navbar } from 'react-bootstrap';

interface INavigationProps {}

export function Navigation(props: INavigationProps) {
    return (
        <Navbar id="nav" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href='/'>Adopt A Dog</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link href='/browse'>Browse</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>
                    <Nav.Link href='/'>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}