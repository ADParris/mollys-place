import 'firebase/firestore';
import firebase from '../config';
import { PostMutations, PostQueries } from './posts';
import { UserMutations, UserQueries } from './user';

export const firestore = firebase.firestore();
export { PostMutations, PostQueries, UserMutations, UserQueries };
