import { IUserCredentials } from 'data/models';
import { auth, UserCredential } from './init';

export interface IAuthResponse {
	failure?: string;
	success?: UserCredential;
}

export const signIn = async ({ email, password }: IUserCredentials) => {
	let response = {} as IAuthResponse;
	try {
		response.success = await auth.signInWithEmailAndPassword(
			email,
			password
		);
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};

export const signOut = async () => {
	await auth.signOut();
};

export { auth };
