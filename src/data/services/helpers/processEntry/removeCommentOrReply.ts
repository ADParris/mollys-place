import { IPost, IPostComment } from 'data/models';

interface RemoveCommentOrReply {
	object: IPost['comments'] | IPostComment['replies'];
	entryToRemove: string;
}

export const removeCommentOrReply = ({
	object,
	entryToRemove,
}: RemoveCommentOrReply) =>
	Object.keys(object!)
		.filter(key => key !== entryToRemove)
		.reduce((obj, key) => {
			obj![key] = object![key];
			return obj;
		}, {} as IPost['comments'] | IPostComment['replies']);
