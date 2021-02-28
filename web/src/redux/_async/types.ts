export const _ASYNC = {
	START: 'ASYNC_START',
	COMPLETE: 'ASYNC_COMPLETE',
	ERROR: 'ASYNC_ERROR',
};

export interface _Async {
	active: boolean;
	errMsg?: AsyncErrMsg;
}

export interface AsyncErrMsg {
	from: string;
	msg: string;
}

interface AsyncStartAction {
	type: typeof _ASYNC.START;
	payload?: null;
}

interface AsyncCompleteAction {
	type: typeof _ASYNC.COMPLETE;
	payload?: null;
}

interface AsyncErrorAction {
	type: typeof _ASYNC.ERROR;
	payload: AsyncErrMsg;
}

export type AsyncActionTypes =
	| AsyncStartAction
	| AsyncCompleteAction
	| AsyncErrorAction;
