import { createSelector } from 'reselect';
import { iComposerState } from './types';

export default class ComposerSelectors {
	_selectComposerState: (state: iComposerState) => iComposerState['composer'];

	selectComposerBackground: Reselect.OutputSelector<
		iComposerState,
		iComposerState['composer']['background'],
		(
			res: iComposerState['composer']
		) => iComposerState['composer']['background']
	>;

	selectComposerContent: Reselect.OutputSelector<
		iComposerState,
		iComposerState['composer']['content'] | undefined,
		(
			res: iComposerState['composer']
		) => iComposerState['composer']['content'] | undefined
	>;

	selectComposerIsActive: Reselect.OutputSelector<
		iComposerState,
		iComposerState['composer']['isActive'],
		(res: iComposerState['composer']) => iComposerState['composer']['isActive']
	>;

	constructor() {
		this._selectComposerState = (
			state: iComposerState
		): iComposerState['composer'] => state.composer;

		this.selectComposerBackground = createSelector(
			[this._selectComposerState],
			composer => composer.background
		);

		this.selectComposerContent = createSelector(
			[this._selectComposerState],
			composer => composer.content
		);

		this.selectComposerIsActive = createSelector(
			[this._selectComposerState],
			composer => composer.isActive
		);
	}
}
