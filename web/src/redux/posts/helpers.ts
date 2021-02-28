import { iPost } from '../../types/post';
import { iPostsState } from './types';

interface iRemoveProps {
	id: iPost['id'];
	list: iPostsState['posts']['list'];
}

interface iUpdateProps {
	list: iPostsState['posts']['list'];
	post: iPost;
}

export const removeItem = ({
	id,
	list,
}: iRemoveProps): iPostsState['posts']['list'] =>
	list.filter(post => post.id !== id);

export const updateItem = ({
	list,
	post,
}: iUpdateProps): iPostsState['posts']['list'] =>
	list.map(item => (item.id === post.id ? post : item));
