import firebase from 'firebase';

interface iUserName {
	first: string;
	full: string;
}

export interface iUser {
	createdAt: number | string;
	email: string;
	id?: string;
	image: string;
	name: iUserName;
	profile: string;
}

export type iUserResponse = { user: iUser } & {
	userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
};
