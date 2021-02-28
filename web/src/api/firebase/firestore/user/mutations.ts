import { firebase } from '../..';
import { iUser } from '../../../../types/user';
import { createUserObj } from './helpers';

export class UserMutations {
	createUser: (
		userAuth: firebase.User,
		userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
	) => Promise<{ user: iUser } | undefined>;

	constructor() {
		this.createUser = async (
			userAuth: firebase.User,
			userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
		) => {
			const user: iUser = createUserObj(userAuth);

			try {
				await userRef.set(user);
				return { user };
			} catch (error) {
				console.error(`Error while creating user... ${error.message}`);
				return undefined;
			}
		};
	}
}
