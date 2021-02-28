import { auth, signInWithGoogle } from './auth';
import firebase from './config';
import {
	firestore,
	PostMutations,
	PostQueries,
	UserMutations,
	UserQueries,
} from './firestore';
import { StorageMutations } from './storage';

export {
	auth,
	firebase,
	firestore,
	PostMutations,
	PostQueries,
	signInWithGoogle,
	StorageMutations,
	UserMutations,
	UserQueries,
};
