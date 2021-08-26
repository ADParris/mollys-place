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
		setEditing: (
			state,
			action: PayloadAction<{ [x: string]: string }>
		) => {
			const key = Object.keys(
				action.payload
			)[0] as keyof typeof state.editing;
			const value = action.payload[key];
			state.editing[key] = value;
		},
		toggleComposing: (state, { payload }: PayloadAction<string>) => {
			const key = payload as keyof typeof state.composing;
			state.composing[key] = !state.composing[key];
		},
		toggleReplying: (state, action: PayloadAction<string>) => {
			state.replying = action.payload;
		},
	},
});

export const { setEditing, toggleComposing, toggleReplying } =
	systemSlice.actions;
export const systemReducer = systemSlice.reducer;

//
// Selectors...
const _selectSystemSlice = (state: RootState): SystemSlice => state.system;

export const selectComposing = createSelector(
	[_selectSystemSlice],
	system => system.composing
);

export const selectEditing = createSelector(
	[_selectSystemSlice],
	system => system.editing
);

export const selectReplying = createSelector(
	[_selectSystemSlice],
	system => system.replying
);
