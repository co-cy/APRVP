import { h } from 'preact';
import style from './style.css';

const Profile = ({ user }) => {
	return (
		<>
			<h1>Hello, {user}</h1>
		</>
	)
}

export default Profile;
