import { SerializedError } from '@reduxjs/toolkit';

import { IUser } from 'data/models';

import { db } from '../init';

export interface IUsersResponse {
	failure: SerializedError | null;
	success: IUser | null;
}

const collectionRef = db.collection('users');

export const retrieveUser = async ({ id }: { id: string }) => {
	const documentRef = collectionRef.doc(id);

	const response = {} as IUsersResponse;

	try {
		const user = await documentRef.get();
		response.success = {
			id: user.id,
			...user.data(),
		} as IUser;
	} catch (error) {
		response.failure = error;
	}

	return response;
};
