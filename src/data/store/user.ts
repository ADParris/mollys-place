import {
	createAsyncThunk,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { IUsersResponse, retrieveUser } from 'data/services';
import { RootState } from './store';

//
// Types...
type UserSlice = {
	current: IUsersResponse['success'] | null;
	error: IUsersResponse['failure'];
	loading: boolean;
};

//
// Initial state...
const initialState: UserSlice = {
	current: null,
	error: null,
	loading: true,
};

//
// Thunk actions...
const setUser = createAsyncThunk(
	`user/setCurrentUser`,
	async (id: string) => await retrieveUser({ id })
);

//
// Reducer...
export const userSlice = createSlice({
	initialState,
	name: `user`,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(setUser.pending, state => {
			state.loading = true;
		});
		builder.addCase(setUser.fulfilled, (state, action) => {
			console.log(action.payload);

			const { failure, success } = action.payload;
			if (failure) {
				state.error = failure;
			} else if (success) {
				state.current = success;
			} else {
				state.current = null;
			}

			if (state.loading) state.loading = false;
		});
		builder.addCase(setUser.rejected, (state, action) => {
			if (state.loading) state.loading = false;
			state.error = action.error;
		});
	},
});

export const { setLoading } = userSlice.actions;
export { setUser };

export const userReducer = userSlice.reducer;

//
// Selectors...
const _selectUserSlice = (state: RootState): UserSlice => state.user;

export const selectUser = createSelector([_selectUserSlice], user => user);
