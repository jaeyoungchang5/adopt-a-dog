import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home, Login, Browse, Logout } from './pages';
import { Navigation } from './components';

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
	return (
		<Router>
			<Navigation />
			<Container>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/browse' element={<Browse />} />
					<Route path='/logout' element={<Logout />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
