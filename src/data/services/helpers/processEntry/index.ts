import { v4 as uuid } from 'uuid';

import { IPost, IPostComment, IPostReply, IUser } from 'data/models';

import {
	assembleCommentReplyObject,
	assemblePostObject,
} from './assembly';
import { removeCommentOrReply } from './removeCommentOrReply';

export interface IProcessEntryProps {
	background?: IPost['background'];
	cid?: IPostComment['id'];
	content?:
		| IPost['content']
		| IPostComment['content']
		| IPostReply['content'];
	creator?: IUser;
	filters?: IPost['filters'];
	post?: IPost;
	rid?: IPostReply['id'];
	update?: boolean;
}

export const processEntry = ({
	background,
	cid,
	content,
	creator,
	filters = {},
	post,
	rid,
	update,
}: IProcessEntryProps) => {
	let _postObj = {} as IPost;

	if (!post && content) {
		console.log(`Creating new post...`);
		const _newPost = assemblePostObject({
			content,
			creator,
			filters,
		}) as IPost;
		if (background) _newPost.background = background;

		_postObj = _newPost;
	} else if (!cid && post && content && update) {
		console.log(`Updating post...`);
		const _updatedContent = content as IPost['content'];
		const _updatedPost = {
			...post,
			content: _updatedContent,
			updatedAt: Date.now(),
		};
		if (background) _updatedPost.background = background;

		_postObj = _updatedPost;
	} else if (!cid && post && content) {
		console.log(`Creating new comment...`);
		const _updatedContent = content as IPostComment['content'];
		const _updatedPost = post.comments
			? {
					...post,
					comments: {
						...post.comments,
						[uuid()]: assembleCommentReplyObject({
							content: _updatedContent,
							creator,
						}) as IPostComment,
					},
			  }
			: {
					...post,
					comments: {
						[uuid()]: assembleCommentReplyObject({
							content: _updatedContent,
							creator,
						}) as IPostComment,
					},
			  };

		_postObj = _updatedPost;
	} else if (!rid && cid && post && content && update) {
		console.log(`Updating comment...`);
		const _updatedContent = content as IPostComment['content'];
		const _updatedPost = {
			...post,
			comments: {
				...post!.comments,
				[cid]: {
					...post!.comments![cid],
					content: _updatedContent,
					updatedAt: Date.now(),
				},
			},
		};

		_postObj = _updatedPost;
	} else if (cid && post && !content && !rid) {
		console.log(`Deleting comment...`);
		let _updatedPost = {} as IPost;
		_updatedPost = {
			...post,
			comments: removeCommentOrReply({
				object: post.comments,
				entryToRemove: cid!,
			}),
		};

		_postObj = _updatedPost;
	} else if (cid && post && content && !update) {
		console.log(`Creating new reply...`);
		const _updatedContent = content as IPostReply['content'];
		const _updatedPost = {
			...post,
			comments: {
				...post!.comments,
				[cid]: post!.comments![cid].replies
					? {
							...post!.comments![cid],
							replies: {
								...post!.comments![cid].replies,
								[uuid()]: assembleCommentReplyObject({
									content: _updatedContent,
									creator,
								}) as IPostReply,
							},
					  }
					: {
							...post!.comments![cid],
							replies: {
								[uuid()]: assembleCommentReplyObject({
									content: _updatedContent,
									creator,
								}) as IPostReply,
							},
					  },
			},
		};

		_postObj = _updatedPost;
	} else if (rid && cid && post && content && update) {
		console.log(`Updating reply...`);
		const _updatedContent = content as IPostReply['content'];
		const _updatedPost = {
			...post,
			comments: {
				...post!.comments,
				[cid!]: {
					...post!.comments![cid!],
					replies: {
						...post!.comments![cid!].replies,
						[rid]: {
							...post!.comments![cid!].replies![rid],
							content: _updatedContent,
							updatedAt: Date.now(),
						},
					},
				},
			},
		};

		_postObj = _updatedPost;
	} else if (cid && !content && post && rid) {
		console.log(`Deleting reply...`);
		let _updatedPost = {} as IPost;
		_updatedPost = {
			...post,
			comments: {
				...post.comments,
				[cid]: {
					...post.comments![cid],
					replies: removeCommentOrReply({
						object: post.comments![cid].replies,
						entryToRemove: rid!,
					}),
				},
			},
		};

		_postObj = _updatedPost;
	}

	return _postObj;
};
