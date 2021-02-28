import { iUser } from '../../types/user';

export const SYSTEM = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
};

interface iSystem {
	currentUser?: iUser;
}

export interface iSystemState {
	system: iSystem;
}

interface iCurrentUserAction {
	type: typeof SYSTEM.SET_CURRENT_USER;
	payload?: iUser;
}

export type iSystemActionTypes = iCurrentUserAction;
