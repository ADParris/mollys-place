import { iComposerActionTypes, COMPOSER } from './types';

const INITIAL_STATE = {
	background: undefined,
	content: undefined,
	isActive: false,
};

export const composer = (
	state = INITIAL_STATE,
	{ type, payload }: iComposerActionTypes
) => {
	switch (type) {
		case COMPOSER.RESET:
			return INITIAL_STATE;
		case COMPOSER.SET_BACKGROUND:
			return { ...state, background: payload };
		case COMPOSER.SET_CONTENT:
			return { ...state, content: payload };
		case COMPOSER.SET_IS_ACTIVE:
			return { ...state, isActive: payload };
		default:
			return state;
	}
};
