import { firebase, firestore } from '../..';
import { iPost, iPostQueryResponse } from '../../../../types/post';

export class PostQueries {
	_postsRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

	retrievePosts: () => Promise<iPostQueryResponse>;

	constructor() {
		this._postsRef = firestore.collection('posts');

		this.retrievePosts = async () => {
			const postsSnapshot = await this._postsRef
				.orderBy('createdAt', 'desc')
				.get();
			try {
				const postList = await Promise.all(
					postsSnapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					}))
				);
				return { success: postList as iPost[] };
			} catch (err) {
				return {
					error: { from: 'PostQueries.retrievePosts', msg: err.message },
				};
			}
		};
	}
}
