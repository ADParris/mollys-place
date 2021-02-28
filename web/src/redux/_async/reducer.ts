import { _ASYNC, AsyncActionTypes } from './types';

const INITIAL_STATE = {
	active: false,
	errMsg: {
		from: undefined,
		text: undefined,
	},
};

export const _async = (
	state = INITIAL_STATE,
	{ type, payload }: AsyncActionTypes
) => {
	switch (type) {
		case _ASYNC.START:
			return { ...state, active: true };
		case _ASYNC.COMPLETE:
			return { ...state, active: false };
		case _ASYNC.ERROR:
			return { ...state, active: false, errMsg: payload };
		default:
			return state;
	}
};
