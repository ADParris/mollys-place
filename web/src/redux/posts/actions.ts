import { Dispatch } from 'redux';
import {
	PostMutations,
	PostQueries,
	StorageMutations,
} from '../../api/firebase';
import { iPost } from '../../types/post';
import { AppThunk } from '../../types/store';
import _AsyncActions from '../_async/actions';
import { POSTS } from './types';

interface iDeleteProps {
	id: iPost['id'];
	image: iPost['content']['image'];
}

export default class PostActions {
	_async = new _AsyncActions();
	postMutations = new PostMutations();
	storageMutations = new StorageMutations();
	postQueries = new PostQueries();

	createPost: (post: iPost) => AppThunk;
	retrievePosts: () => AppThunk;
	updatePost: (post: iPost) => AppThunk;
	deletePost: ({ id, image }: iDeleteProps) => AppThunk;

	constructor() {
		this.createPost = post => async (dispatch: Dispatch) => {
			dispatch(this._async.start());
			try {
				const resp = await this.postMutations.create(post);
				if (resp.error) {
					dispatch(this._async.error(resp.error));
					return;
				}
				dispatch(this._async.complete());
				dispatch({ type: POSTS.CREATE, payload: resp.success });
			} catch (err) {
				dispatch(
					this._async.error({
						from: 'PostActions.createPost',
						msg: err.message,
					})
				);
			}
		};

		this.retrievePosts = () => async (dispatch: Dispatch) => {
			dispatch(this._async.start());

			try {
				const resp = await this.postQueries.retrievePosts();
				if (resp.error) {
					dispatch(this._async.error(resp.error));
					return;
				}
				dispatch({ type: POSTS.RETRIEVE, payload: resp.success });
				dispatch(this._async.complete());
			} catch (error) {
				dispatch(
					this._async.error({
						from: 'PostActions.retrievePosts',
						msg: error.message,
					})
				);
			}
		};

		this.updatePost = post => async (dispatch: Dispatch) => {
			const { id, ...updatedPost } = post;
			updatedPost.updatedAt = Date.now();

			dispatch(this._async.start());

			try {
				const resp = await this.postMutations.update(updatedPost, id);
				if (resp.error) {
					dispatch(this._async.error(resp.error));
					return;
				}
				dispatch(this._async.complete());
				dispatch({ type: POSTS.UPDATE, payload: post });
			} catch (err) {
				dispatch(
					this._async.error({
						from: 'PostActions.updatePost',
						msg: err.message,
					})
				);
			}
		};

		this.deletePost = ({ id, image }) => async (dispatch: Dispatch) => {
			dispatch(this._async.start());

			if (image) {
				try {
				} catch (err) {
					dispatch(
						this._async.error({
							from: 'PostActions.deletePost(image)',
							msg: err.message,
						})
					);
				}
				const resp = await this.storageMutations.delete(image.name);

				if (resp.error) {
					dispatch(this._async.error(resp.error));
					return;
				}
			}

			try {
				const resp = await this.postMutations.delete(id);
				if (resp.error) {
					dispatch(this._async.error(resp.error));
					return;
				}
				dispatch(this._async.complete());
				dispatch({ type: POSTS.DELETE, payload: id });
			} catch (err) {
				dispatch(
					this._async.error({
						from: 'PostActions.deletePost',
						msg: err.message,
					})
				);
			}
		};
	}
}
