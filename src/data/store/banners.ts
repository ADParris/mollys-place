import {
	createAsyncThunk,
	createSelector,
	createSlice,
	SerializedError,
} from '@reduxjs/toolkit';

import { IBanner, IBanners } from 'data/models';
import { retrieveBanners, updateBanner } from 'data/services';
import { RootState } from './store';

//
// Types...
type BannersSlice = {
	error: SerializedError | null;
	list: IBanners | {};
	loading: boolean;
};

//
// Initial state...
const initialState: BannersSlice = {
	error: null,
	list: {},
	loading: true,
};

//
// Thunk actions...
const setBanners = createAsyncThunk(
	'banners/setBanners',
	async () => await retrieveBanners()
);

export interface IUpdateBanner {
	id: string;
	banner: IBanner | {};
}

const updateBanners = createAsyncThunk(
	'banners/updateBanners',
	async ({ id, banner }: IUpdateBanner) =>
		await updateBanner({ id, banner })
);

//
// Reducer...
export const bannersSlice = createSlice({
	initialState,
	name: `banners`,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(setBanners.pending, state => {
			if (!state.loading) state.loading = true;
		});
		builder.addCase(setBanners.fulfilled, (state, action) => {
			if (action.payload.failure) {
				state.error = action.payload.failure;
			} else {
				state.list = action.payload.success;
			}
			if (state.loading) state.loading = false;
		});
		builder.addCase(setBanners.rejected, (state, action) => {
			state.error = action.error;
			if (state.loading) state.loading = false;
		});
		builder.addCase(updateBanners.pending, state => {
			if (!state.loading) state.loading = true;
		});
		builder.addCase(updateBanners.fulfilled, (state, action) => {
			if (action.payload.failure) {
				state.error = action.payload.failure;
			} else {
				const { banner, id } = action.payload.success;
				const list = getKeyValue(id)(state.list);
				list[id] = banner;
				return list;
			}
		});
		builder.addCase(updateBanners.rejected, (state, action) => {
			state.error = action.error;
			if (state.loading) state.loading = false;
		});
	},
});

const getKeyValue = (key: string) => (obj: Record<string, any>) =>
	obj[key];

export const bannersReducer = bannersSlice.reducer;
export { setBanners, updateBanners };

//
// Selectors...
const _selectBannersSlice = (state: RootState): BannersSlice =>
	state.banners;

export const selectBanners = createSelector(
	[_selectBannersSlice],
	banners => banners
);
