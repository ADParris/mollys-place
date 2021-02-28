import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../redux/rootReducer';

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
