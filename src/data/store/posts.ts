import {
	createAsyncThunk,
	createSelector,
	createSlice,
	current,
	PayloadAction,
	SerializedError,
} from '@reduxjs/toolkit';

import { IPost, PostFilterTypes } from 'data/models';
import { IRetrievePosts, retrievePosts } from 'data/services';
import { RootState } from './store';

//
// Types...
type PostsSlice = {
	cursor: number | null;
	error: SerializedError | null;
	isEnd: boolean;
	list: IPost[];
	loading: boolean;
	prevFilter: PostFilterTypes | null;
};

//
// Initial state...
const initialState: PostsSlice = {
	cursor: null,
	error: null,
	isEnd: false,
	list: [],
	loading: false,
	prevFilter: null,
};

//
// Thunk actions...
const setPosts = createAsyncThunk(
	'posts/setPosts',
	async (
		{ cursor, filter, isAuthed }: IRetrievePosts,
		{ dispatch, getState }
	) => {
		const {
			posts: { prevFilter },
		} = (await getState()) as RootState;

		const sameFilter = prevFilter === filter;
		dispatch(setPrevFilter(filter));
		cursor = sameFilter ? cursor : null;

		const response = await retrievePosts({
			cursor,
			filter,
			isAuthed,
		});

		if (response.success && response.success.isEnd) {
			dispatch(setIsEnd(true));
		}

		return response;
	}
);

//
// Reducer...
export const postsSlice = createSlice({
	initialState,
	name: `posts`,
	reducers: {
		addPost: (state, action: PayloadAction<IPost>) => {
			state.list =
				current(state.list).length === 0
					? [action.payload]
					: [action.payload, ...state.list];

			return state;
		},
		removePost: (state, action: PayloadAction<IPost['id']>) => {
			state.list = state.list.filter(
				(post: IPost) => post.id !== action.payload
			);

			return state;
		},
		resetPostsSlice: state => ({
			...initialState,
			prevFilter: state.prevFilter,
		}),
		setIsEnd: (state, action: PayloadAction<boolean>) => {
			state.isEnd = action.payload;
		},
		setPrevFilter: (
			state,
			action: PayloadAction<PostFilterTypes | null>
		) => {
			state.prevFilter = action.payload;
		},
		updatePost: (state, action: PayloadAction<IPost>) => {
			state.list = state.list.map((post: IPost) =>
				post.id === action.payload.id ? action.payload : post
			);

			return state;
		},
	},
	extraReducers: builder => {
		builder.addCase(setPosts.pending, state => {
			if (!state.loading) state.loading = true;
		});
		builder.addCase(setPosts.fulfilled, (state, action) => {
			if (state.loading) state.loading = false;
			if (action.payload.success) {
				const { success } = action.payload;
				state.list.push(...success.posts);
				state.cursor = success.cursor;
			}
		});
		builder.addCase(setPosts.rejected, (state, action) => {
			if (state.loading) state.loading = false;
			state.error = action.error;
		});
	},
});

export const {
	addPost,
	removePost,
	resetPostsSlice,
	setIsEnd,
	setPrevFilter,
	updatePost,
} = postsSlice.actions;
export { setPosts };
export const postsReducer = postsSlice.reducer;

//
// Selectors...
const _selectPostsSlice = (state: RootState): PostsSlice => state.posts;

export const selectPosts = createSelector(
	[_selectPostsSlice],
	posts => posts
);

export const selectPostById = (pid: IPost['id']) =>
	createSelector(
		[_selectPostsSlice],
		posts => posts.list.filter(post => post.id === pid)[0]
	);
