import { firebase, firestore } from '../..';
import { iUser, iUserResponse } from '../../../../types/user';

export class UserQueries {
	retrieveUser: (id: firebase.User['uid']) => Promise<iUserResponse>;

	constructor() {
		this.retrieveUser = async uid => {
			const userRef = firestore.doc(`users/${uid}`);
			const userSnapshot = await userRef.get();
			if (userSnapshot.exists) {
				const user = userSnapshot.data();
				if (user) {
					return {
						user: {
							id: user.uid,
							...user,
							createdAt: new Date(user.createdAt).toLocaleString(),
						} as iUser,
					} as iUserResponse;
				}
			}
			return { userRef } as iUserResponse;
		};
	}
}
