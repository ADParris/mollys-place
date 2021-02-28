import { iPost } from '../../types/post';
import { removeItem, updateItem } from './helpers';
import { iPostActionTypes, POSTS } from './types';

const INITIAL_STATE = {
	list: [] as iPost[],
};

export const posts = (
	state = INITIAL_STATE,
	{ type, payload }: iPostActionTypes
) => {
	switch (type) {
		case POSTS.CREATE:
			return { ...state, list: [payload, ...state.list] };
		case POSTS.RETRIEVE:
			return { ...state, list: payload };
		case POSTS.UPDATE:
			return {
				...state,
				list: updateItem({ list: state.list, post: payload as iPost }),
			};
		case POSTS.DELETE:
			return {
				...state,
				list: removeItem({ id: payload as iPost['id'], list: state.list }),
			};
		default:
			return state;
	}
};
