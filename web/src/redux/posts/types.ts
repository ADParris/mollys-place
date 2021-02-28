import { iPost } from '../../types/post';

export const POSTS = {
	CREATE: 'CREATE',
	RETRIEVE: 'RETRIEVE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
};

export interface iPosts {
	list: iPost[];
}

export interface iPostsState {
	posts: iPosts;
}

interface iCreatePostAction {
	type: typeof POSTS.CREATE;
	payload: iPost;
}

interface iRetrievePostsAction {
	type: typeof POSTS.RETRIEVE;
	payload: iPost[];
}

interface iUpdatePostAction {
	type: typeof POSTS.UPDATE;
	payload: iPost;
}

interface iDeletePostAction {
	type: typeof POSTS.DELETE;
	payload: iPost['id'];
}

export type iPostActionTypes =
	| iCreatePostAction
	| iRetrievePostsAction
	| iUpdatePostAction
	| iDeletePostAction;
