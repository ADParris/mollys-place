import {
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { IPost } from 'data/models';
import { RootState } from './store';

//
// Types...
type EditorSlice = {
	post: {
		background: string | undefined;
		content?: IPost['content'];
		errMsg: string;
		filters: IPost['filters'];
		submission: string;
	};
};

//
// Initial state...
const initialState: EditorSlice = {
	post: {
		background: undefined,
		content: undefined,
		errMsg: ``,
		filters: {
			general: true,
			public: true,
			user: true,
		},
		submission: ``,
	},
};

//
// Reducer...
export const editorSlice = createSlice({
	initialState,
	name: `editor`,
	reducers: {
		resetEditor: () => initialState,
		setPostBackground: (
			state,
			action: PayloadAction<IPost['background']>
		) => {
			state.post.background = action.payload;
		},
		setPostContent: (
			state,
			action: PayloadAction<IPost['content'] | undefined>
		) => {
			if (action.payload) {
				state.post.content = state.post.content
					? { ...state.post.content, ...action.payload }
					: action.payload;
			} else {
				state.post = initialState.post;
			}
		},
		setPostErrMsg: (state, action: PayloadAction<string>) => {
			state.post.errMsg = action.payload;
		},
		setPostFilter: (state, action: PayloadAction<IPost['filters']>) => {
			state.post.filters = action.payload;
		},
		setPostSubmission: (state, action: PayloadAction<string>) => {
			state.post.submission = action.payload;
		},
	},
});

export const {
	resetEditor,
	setPostBackground,
	setPostContent,
	setPostErrMsg,
	setPostFilter,
	setPostSubmission,
} = editorSlice.actions;
export const editorReducer = editorSlice.reducer;

//
// Selectors...
const _selectEditorSlice = (state: RootState) => state.editor;

export const selectPost = createSelector(
	[_selectEditorSlice],
	editor => editor.post
);
