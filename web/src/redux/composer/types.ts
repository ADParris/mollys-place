import { iPost } from '../../types/post';

export const COMPOSER = {
	RESET: 'RESET',
	SET_BACKGROUND: 'SET_BACKGROUND',
	SET_CONTENT: 'SET_CONTENT',
	SET_IS_ACTIVE: 'SET_IS_ACTIVE',
};

interface iComposer {
	background?: iPost['background'];
	content?: iPost['content'];
	isActive: boolean;
}

export interface iComposerState {
	composer: iComposer;
}

interface iComposerBackgroundAction {
	type: typeof COMPOSER.SET_BACKGROUND;
	payload: iPost['background'];
}

interface iComposerContentAction {
	type: typeof COMPOSER.SET_CONTENT;
	payload?: iPost['content'];
}

interface iComposerIsActiveAction {
	type: typeof COMPOSER.SET_IS_ACTIVE;
	payload: boolean;
}

interface iComposerResetAction {
	type: typeof COMPOSER.RESET;
	payload?: boolean;
}

export type iComposerActionTypes =
	| iComposerBackgroundAction
	| iComposerContentAction
	| iComposerIsActiveAction
	| iComposerResetAction;
