import { iPost } from '../../types/post';
import { COMPOSER, iComposerActionTypes } from './types';

export default class ComposerActions {
	resetComposer: () => void;
	setBackground: (background: iPost['background']) => iComposerActionTypes;
	setContent: (content: iPost['content'] | undefined) => iComposerActionTypes;
	setIsActive: (isActive: boolean) => iComposerActionTypes;

	constructor() {
		this.resetComposer = () => ({ type: COMPOSER.RESET });

		this.setBackground = background => ({
			type: COMPOSER.SET_BACKGROUND,
			payload: background,
		});

		this.setContent = content => ({
			type: COMPOSER.SET_CONTENT,
			payload: content,
		});

		this.setIsActive = isActive => ({
			type: COMPOSER.SET_IS_ACTIVE,
			payload: isActive,
		});
	}
}
