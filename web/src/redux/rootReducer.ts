import { combineReducers } from 'redux';
import { composer } from './composer/reducer';
import { posts } from './posts/reducer';
import { system } from './system/reducer';
import { _async } from './_async/reducer';

export const rootReducer = combineReducers({
	_async,
	composer,
	posts,
	system,
});

export type RootState = ReturnType<typeof rootReducer>;
