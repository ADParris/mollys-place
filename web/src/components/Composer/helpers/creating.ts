import { iCreatingPostObj, iPost } from '../../../types/post';
import { iUser } from '../../../types/user';

export default class Creating {
	_creatorObj: (currentUser: iUser) => iPost['creator'];

	postObj: ({ background, currentUser, content }: iCreatingPostObj) => iPost;

	constructor() {
		this._creatorObj = currentUser => ({
			id: currentUser.id!,
			image: currentUser.image,
			name: currentUser.name.full,
			profile: currentUser.profile,
		});

		this.postObj = ({ background, currentUser, content }) => {
			const newPost: iPost = {
				content,
				createdAt: Date.now(),
				creator: this._creatorObj(currentUser),
			};

			if (background) newPost.background = background;

			return newPost;
		};
	}
}
