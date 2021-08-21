import { IPost } from 'data/models';
import { db } from '../init';

const collectionRef = db.collection('posts');

interface IPostsMutationResponse {
	failure: string;
	success: boolean | string;
}

export const mCreatePost = async (
	post: IPost
): Promise<IPostsMutationResponse> => {
	const postRef = collectionRef.doc();
	const response = {} as IPostsMutationResponse;

	try {
		await postRef.set(post);
		response.success = postRef.id;
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};

export const mDeletePost = async (
	pid: IPost['id']
): Promise<IPostsMutationResponse> => {
	const postRef = collectionRef.doc(pid);
	const response = {} as IPostsMutationResponse;

	try {
		await postRef.delete();
		response.success = true;
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};

export const mUpdatePost = async (
	post: IPost
): Promise<IPostsMutationResponse> => {
	const updatedPost = { ...post };
	const postRef = collectionRef.doc(updatedPost.id);
	const response = {} as IPostsMutationResponse;

	delete updatedPost.id;

	try {
		await postRef.update(updatedPost);
		response.success = true;
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};
