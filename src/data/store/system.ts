import {
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';

//
// Types...
type SystemSlice = {
	composing: {
		image: boolean;
		recipe: boolean;
		video: boolean;
	};
	editing: {
		comment: string;
		post: string;
		reply: string;
	};
	replying: string;
};

//
// Initial state...
const initialState: SystemSlice = {
	composing: { image: false, recipe: false, video: false },
	editing: { comment: ``, post: ``, reply: `` },
	replying: ``,
};

//
// Reducer...
export const systemSlice = createSlice({
	initialState,
	name: `system`,
	reducers: {
		toggleComposingImage: state => {
			state.composing.image = !state.composing.image;
		},
		toggleComposingRecipe: state => {
			state.composing.recipe = !state.composing.recipe;
		},
		toggleComposingVideo: state => {
			state.composing.video = !state.composing.video;
		},
		toggleEditingComment: (state, action: PayloadAction<string>) => {
			state.editing.comment = action.payload;
		},
		toggleEditingPost: (state, action: PayloadAction<string>) => {
			state.editing.post = action.payload;
		},
		toggleEditingReply: (state, action: PayloadAction<string>) => {
			state.editing.reply = action.payload;
		},
		toggleReplying: (state, action: PayloadAction<string>) => {
			state.replying = action.payload;
		},
	},
});

export const {
	toggleComposingImage,
	toggleComposingRecipe,
	toggleComposingVideo,
	toggleEditingComment,
	toggleEditingPost,
	toggleEditingReply,
	toggleReplying,
} = systemSlice.actions;
export const systemReducer = systemSlice.reducer;

//
// Selectors...
const _selectSystemSlice = (state: RootState): SystemSlice => state.system;

const _selectComposing = createSelector(
	[_selectSystemSlice],
	system => system.composing
);

export const selectComposingImage = createSelector(
	[_selectComposing],
	composing => composing.image
);

export const selectComposingRecipe = createSelector(
	[_selectComposing],
	composing => composing.recipe
);

export const selectComposingVideo = createSelector(
	[_selectComposing],
	composing => composing.video
);

const _selectEditing = createSelector(
	[_selectSystemSlice],
	system => system.editing
);

export const selectEditingComment = createSelector(
	[_selectEditing],
	editing => editing.comment
);

export const selectEditingPost = createSelector(
	[_selectEditing],
	editing => editing.post
);

export const selectEditingReply = createSelector(
	[_selectEditing],
	editing => editing.reply
);

export const selectReplying = createSelector(
	[_selectSystemSlice],
	system => system.replying
);
