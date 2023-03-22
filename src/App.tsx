import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home, Login, Browse, Logout, Match } from './pages';
import { Navigation } from './components';

import './App.css';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navigation />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/browse' element={<Browse />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/match' element={<Match matchID={''} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
