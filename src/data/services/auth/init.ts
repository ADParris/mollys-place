import { firebase } from '../init';
import 'firebase/auth';

export const auth = firebase.auth();
export type UserCredential = firebase.auth.UserCredential;
