import { firebase, firestore } from '../..';
import { iPostMutationResponse, iPost } from '../../../../types/post';

export class PostMutations {
	_postsRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

	create: (post: iPost) => Promise<iPostMutationResponse>;
	update: (post: iPost, id: iPost['id']) => Promise<iPostMutationResponse>;
	delete: (id: iPost['id']) => Promise<iPostMutationResponse>;

	constructor() {
		this._postsRef = firestore.collection('posts');

		this.create = async (post: iPost): Promise<iPostMutationResponse> => {
			const postRef = this._postsRef.doc();
			try {
				await postRef.set(post);
				return { success: { ...post, id: postRef.id } };
			} catch (err) {
				return { error: { from: 'PostMutations.create', msg: err.message } };
			}
		};

		this.update = async (post: iPost, id: iPost['id']) => {
			const postRef = this._postsRef.doc(id);
			try {
				await postRef.update(post);
				return { success: true };
			} catch (err) {
				return { error: { from: 'PostMutations.update', msg: err.message } };
			}
		};

		this.delete = async (id: iPost['id']): Promise<iPostMutationResponse> => {
			const postRef = this._postsRef.doc(id);
			try {
				await postRef.delete();
				return { success: true };
			} catch (err) {
				return { error: { from: 'PostMutations.delete', msg: err.message } };
			}
		};
	}
}
