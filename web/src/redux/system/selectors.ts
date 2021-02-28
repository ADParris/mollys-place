import { createSelector } from 'reselect';
import { iUser } from '../../types/user';
import { iSystemState } from './types';

export default class SystemSelectors {
	_selectSystem: (state: iSystemState) => iSystemState['system'];

	selectCurrentUser: Reselect.OutputSelector<
		iSystemState,
		iUser | undefined,
		(res: iSystemState['system']) => iUser | undefined
	>;

	constructor() {
		this._selectSystem = (state: iSystemState): iSystemState['system'] =>
			state.system;

		this.selectCurrentUser = createSelector(
			[this._selectSystem],
			system => system.currentUser
		);
	}
}
