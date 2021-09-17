import { h } from 'preact';
import { Router } from 'preact-router';
import { Container } from '@material-ui/core'


import Home from '../routes/home';
import Profile from '../routes/profile';
import Login from '../routes/login';
import Search from '../routes/search';

const App = () => (
	<div id="app">
		<Container>
			<Router>
				<Home path="/" />
				<Login path="/login" />
				<Search path="/search" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
		</Container>
	</div>
)

export default App;
