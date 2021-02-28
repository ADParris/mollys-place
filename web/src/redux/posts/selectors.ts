import { createSelector } from 'reselect';
import { iPost } from '../../types/post';
import { iPostsState } from './types';

export default class PostSelectors {
	_selectPostState: (state: iPostsState) => { list: iPost[] };

	selectPostsList: Reselect.OutputSelector<
		iPostsState,
		iPost[],
		(res: { atEnd: boolean; list: iPost[]; loaderVisible: boolean }) => iPost[]
	>;

	constructor() {
		this._selectPostState = (state: iPostsState) => state.posts;

		this.selectPostsList = createSelector(
			[this._selectPostState],
			posts => posts.list
		);
	}
}
