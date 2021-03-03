import { _ASYNC, AsyncActionTypes, AsyncErrMsg } from './types';

export default class _Async {
	start: () => AsyncActionTypes;
	complete: () => AsyncActionTypes;
	error: (errMsg: AsyncErrMsg) => AsyncActionTypes;

	constructor() {
		this.start = () => ({
			type: _ASYNC.START,
		});
		this.complete = () => ({
			type: _ASYNC.COMPLETE,
		});
		this.error = (errMsg: AsyncErrMsg) => ({
			type: _ASYNC.ERROR,
			payload: errMsg,
		});
	}
}
