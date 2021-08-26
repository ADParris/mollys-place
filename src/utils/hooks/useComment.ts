import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPost, IPostComment } from 'data/models';
import { usePostMutations } from 'data/services';
import {
	selectEditing,
	selectReplying,
	setEditing,
	toggleReplying,
} from 'data/store/system';

interface IUseComment {
	cid?: IPostComment['id'];
	creator: IPostComment['creator'];
	post: IPost;
}

export const useComment = ({ cid, creator, post }: IUseComment) => {
	const INITIAL_STATE = cid ? post.comments![cid].content : ``;
	const [content, setContent] =
		useState<IPostComment['content']>(INITIAL_STATE);

	const dispatch = useDispatch();
	const isEditing = useSelector(selectEditing).comment === cid;
	const isReplying = useSelector(selectReplying) === cid;

	const { errMsg, updatePost } = usePostMutations();

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e =>
		setContent(e.target.value);

	const handleDelete = async (cid: string) =>
		updatePost({
			cid,
			post,
		});

	const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> =
		e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				handleSubmit();
			}
		};

	const handleSubmit = async () => {
		updatePost({
			cid,
			content,
			creator,
			post,
			update: isEditing,
		});

		setContent(``);
		cid && dispatch(setEditing({ comment: `` }));
	};

	const toggleIsReplying = () =>
		dispatch(toggleReplying(isReplying ? `` : cid!));

	return {
		content,
		errMsg,
		handleChange,
		handleDelete,
		handleKeyPress,
		handleSubmit,
		isEditing,
		toggleIsReplying,
	};
};
