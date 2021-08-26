import {
	ChangeEventHandler,
	KeyboardEventHandler,
	useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost, IUser, PostFilterTypes } from 'data/models';

import { retrieveVideoInfo, usePostMutations } from 'data/services';
import {
	resetEditor,
	selectPost,
	setPostBackground,
	setPostContent,
	setPostErrMsg,
	setPostFilter,
	setPostSubmission,
} from 'data/store/editor';
import {
	selectComposing,
	selectEditing,
	setEditing,
	toggleComposing,
} from 'data/store/system';
import { selectUser } from 'data/store/user';
import { processFilters, processImage } from 'utils/processing';

export const usePost = (post?: IPost) => {
	const {
		createPost,
		deletePost,
		errMsg: errorMsg,
		updatePost,
	} = usePostMutations();

	const { background, content, errMsg, filters, submission } =
		useSelector(selectPost);
	const { current: currentUser } = useSelector(selectUser);
	const isComposing = useSelector(selectComposing);
	const isEditing = useSelector(selectEditing).post === post?.id;

	const dispatch = useDispatch();

	useEffect(() => {
		if (isEditing) {
			if (post?.background) dispatch(setPostBackground(post.background));
			if (post?.content) dispatch(setPostContent(post.content));
			if (errorMsg) dispatch(setPostErrMsg(errorMsg));
		}
	}, [errorMsg, dispatch, isEditing, post]);

	const _editorReset = () => {
		if (post) {
			dispatch(setEditing({ post: `` }));
		} else {
			isComposing.image
				? toggleImageSubmit()
				: isComposing.recipe
				? toggleRecipeSubmit()
				: isComposing.video && toggleVideoSubmit();
		}
		dispatch(resetEditor());
	};

	const handleBgChange = (value: string) =>
		dispatch(setPostBackground(value));

	const handleCancel = () => _editorReset();

	const handleContentChange = (newContent: IPost['content']) =>
		dispatch(setPostContent(newContent));

	const handleDelete = async (id: string) => await deletePost(id);

	const handleFilterSelect: ChangeEventHandler<HTMLSelectElement> = e => {
		const filterKey =
			PostFilterTypes[
				e.target.value.toUpperCase() as keyof typeof PostFilterTypes
			];
		const newFilters = processFilters({
			filters,
			selected: filterKey,
		});
		dispatch(setPostFilter(newFilters));
	};

	const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			getVideo();
		}
	};

	const handleSubmit = async () => {
		if (post) {
			await updatePost({
				background,
				content,
				post,
				update: isEditing,
			});
		} else {
			await createPost({
				background,
				content,
				creator: currentUser as IUser,
				filters,
			});
		}
		_editorReset();
	};

	const handleSubmission: ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			getImage(e.target.files[0]);
		} else if (e.target.value) {
			dispatch(setPostSubmission(e.target.value));
		}
	};

	const getImage = async (image: File) => {
		if (image.name.match(/(i?)\.(jpe?g|png|gif)$/gi)) {
			const response = await processImage(image);

			if (response.failure) {
				dispatch(setPostErrMsg(response.failure));
			} else {
				dispatch(setPostErrMsg(''));
				handleContentChange({
					image: response.success as IPost['content']['image'],
				});
			}
		} else {
			dispatch(setPostErrMsg('Invalid file type provided.'));
		}
	};

	const getVideo = async () => {
		const response = await retrieveVideoInfo(submission);

		if (response.failure) {
			dispatch(setPostErrMsg(response.failure));
		} else {
			dispatch(setPostErrMsg(''));
			handleContentChange(response.success);
			dispatch(setPostSubmission(''));
			toggleVideoSubmit();
		}
	};

	const toggleImageSubmit = () => dispatch(toggleComposing(`image`));
	const toggleIsEditing = () =>
		dispatch(setEditing({ post: isEditing ? `` : post!.id! }));
	const toggleRecipeSubmit = () => dispatch(toggleComposing(`recipe`));
	const toggleVideoSubmit = () => dispatch(toggleComposing(`video`));

	return {
		background,
		content,
		errMsg,
		filters,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleDelete,
		handleFilterSelect,
		handleKeyPress,
		handleSubmission,
		handleSubmit,
		isComposing,
		isEditing,
		processImage,
		submission,
		toggleImageSubmit,
		toggleIsEditing,
		toggleRecipeSubmit,
		toggleVideoSubmit,
	};
};
