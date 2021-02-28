import { firebase } from '../..';
import Silhouette from '../../../../assets/silhouette.png';
import { iUser } from '../../../../types/user';

export const createUserObj = (userAuth: firebase.User): iUser => {
	let { displayName, email, photoURL } = userAuth;
	displayName = displayName ? displayName : `Undefined`;
	email = email ? email : `example@domain.ext`;
	photoURL = photoURL ? photoURL : Silhouette;

	return {
		createdAt: Date.now(),
		email,
		image: photoURL,
		name: {
			first: displayName.split(' ')[0],
			full: displayName,
		},
		profile: `${displayName?.split(' ').join('').toLowerCase()}`,
	};
};
