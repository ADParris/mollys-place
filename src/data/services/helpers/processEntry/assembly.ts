import { IPost, IPostComment, IPostReply, IUser } from 'data/models';

export const _assembleCreatorObject = ({ id, image, name }: IUser) => ({
	id,
	image,
	name,
});

interface AssemblePostObject {
	content:
		| IPost['content']
		| IPostComment['content']
		| IPostReply['content'];
	creator?: IUser;
	filters: IPost['filters'];
}

export const assemblePostObject = ({
	content,
	creator,
	filters,
}: AssemblePostObject) => ({
	content,
	createdAt: Date.now(),
	creator: _assembleCreatorObject(creator!),
	filters,
});

interface AssembleCommentReplyObject {
	content: IPostComment['content'] | IPostReply['content'];
	creator?: IUser;
}

export const assembleCommentReplyObject = ({
	content,
	creator,
}: AssembleCommentReplyObject) => ({
	content,
	createdAt: Date.now(),
	creator: _assembleCreatorObject(creator!),
});
