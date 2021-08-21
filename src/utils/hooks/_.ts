import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	selectPost,
	setPostBackground,
	setPostContent,
} from 'data/store/editor';
import { selectEditingPost, toggleEditingPost } from 'data/store/system';

import { IPost } from 'data/models';
import { usePostMutations } from 'data/services';

export const usePost = (post?: IPost) => {
	const { deletePost, errMsg, updatePost } = usePostMutations();

	const { background, content } = useSelector(selectPost);
	const isEditingPost = useSelector(selectEditingPost);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post?.background) dispatch(setPostBackground(post.background));
		if (post?.content) dispatch(setPostContent(post.content));
	}, [dispatch, post]);

	const handleBgChange = (value: string) =>
		dispatch(setPostBackground(value));

	const handleCancel = () => {
		dispatch(setPostContent(undefined));
		dispatch(toggleEditingPost(``));
	};

	const handleContentChange = (newContent: IPost['content']) =>
		dispatch(setPostContent(newContent));

	const handleDelete = async (id: string) => await deletePost(id);

	const handleSubmit = async () => {
		await updatePost({
			background,
			content,
			post,
			update: !!isEditingPost,
		});

		toggleIsEditing();
		dispatch(setPostContent(undefined));
	};

	const toggleIsEditing = () =>
		dispatch(toggleEditingPost(isEditingPost ? `` : post!.id!));

	return {
		background,
		content,
		errMsg,
		isEditingPost,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleDelete,
		handleSubmit,
		toggleIsEditing,
	};
};
