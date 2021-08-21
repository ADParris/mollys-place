import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IPost } from 'data/models';
import {
	addPost,
	removePost,
	updatePost as rUpdatePost,
} from 'data/store';
import { mCreatePost, mDeletePost, mUpdatePost } from '../database';
import { IProcessEntryProps, processEntry } from '../helpers';

export const usePostMutations = () => {
	const [errMsg, setErrMsg] = useState('');

	const dispatch = useDispatch();

	const createPost = async ({
		background,
		content,
		creator,
		filters,
	}: IProcessEntryProps) => {
		const post = processEntry({ background, content, creator, filters });

		const response = await mCreatePost(post);

		if (response.failure) {
			setErrMsg(response.failure);
		} else {
			dispatch(addPost({ id: response.success as string, ...post }));
		}
	};

	const deletePost = async (pid: IPost['id']) => {
		const response = await mDeletePost(pid);

		if (response.failure) {
			setErrMsg(response.failure);
		} else {
			dispatch(removePost(pid));
		}
	};

	const updatePost = async ({
		background,
		cid,
		content,
		creator,
		post,
		rid,
		update,
	}: IProcessEntryProps) => {
		const updatedPost = processEntry({
			background,
			cid,
			content,
			creator,
			post,
			rid,
			update,
		});

		const response = await mUpdatePost(updatedPost);

		if (response.failure) {
			setErrMsg(response.failure);
		} else {
			dispatch(rUpdatePost(updatedPost));
		}
	};

	return { createPost, deletePost, errMsg, updatePost };
};
