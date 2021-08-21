import { configureStore } from '@reduxjs/toolkit';

import { bannersReducer } from './banners';
import { editorReducer } from './editor';
import { postsReducer } from './posts';
import { systemReducer } from './system';
import { userReducer } from './user';

export const store = configureStore({
	reducer: {
		banners: bannersReducer,
		editor: editorReducer,
		posts: postsReducer,
		system: systemReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
