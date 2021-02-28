import { SYSTEM, iSystemActionTypes } from './types';

const INITIAL_STATE = {
	currentUser: undefined, // Current user. Type: User object | undefined.
};

export const system = (
	state = INITIAL_STATE,
	{ type, payload }: iSystemActionTypes
) => {
	switch (type) {
		case SYSTEM.SET_CURRENT_USER:
			return { ...state, currentUser: { ...payload } };
		default:
			return state;
	}
};
