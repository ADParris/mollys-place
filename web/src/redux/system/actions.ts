import { Dispatch } from 'redux';
import { firebase, UserMutations, UserQueries } from '../../api/firebase';
import { AppThunk } from '../../types/store';
import { iUserResponse } from '../../types/user';
import AsyncActions from '../_async/actions';
import { SYSTEM } from './types';

export default class SystemActions {
	_async = new AsyncActions();
	mutations = new UserMutations();
	queries = new UserQueries();

	setCurrentUser: (userAuth: firebase.User) => AppThunk;

	constructor() {
		this.setCurrentUser = userAuth => async (dispatch: Dispatch) => {
			let userResponse: iUserResponse;
			let user = undefined;

			dispatch(this._async.start());
			try {
				userResponse = await this.queries.retrieveUser(userAuth.uid);
				// If the Auth user does NOT exist in the database, let's add them...
				if (userResponse.userRef) {
					user = await this.mutations.createUser(
						userAuth,
						userResponse.userRef
					);
				}
				// Now that the user has been processed, let's add them as the
				// current user in the Redux store...
				user = user
					? { ...user, id: userAuth.uid }
					: { ...userResponse.user, id: userAuth.uid };
				dispatch({ type: SYSTEM.SET_CURRENT_USER, payload: user });
				dispatch(this._async.complete());
			} catch (error) {
				dispatch(this._async.error({ from: 'retrieving', msg: error.message }));
			}
		};
	}
}
