import { ContentState, EditorState } from 'draft-js';
import { iPost } from '../../../types/post';
import { iUser } from '../../../types/user';
import Creating from './creating';

interface iSubmitProps {
	background?: string;
	content?: iPost['content'];
	currentUser: iUser;
}

export default class PostHandling {
	_creating = new Creating();

	reset: (editorState: EditorState) => EditorState;

	submit: ({
		background,
		content,
		currentUser,
	}: iSubmitProps) => iPost | undefined;

	constructor() {
		this.reset = editorState => {
			const newEditorState = EditorState.push(
				editorState,
				ContentState.createFromText(''),
				'remove-range'
			);
			return newEditorState;
		};

		this.submit = ({ background, content, currentUser }) => {
			if (!currentUser || !content) return;

			const isEmpty = !Object.values(content).some(
				x => x !== undefined && x !== ''
			);
			if (isEmpty) return;

			return this._creating.postObj({
				background,
				content,
				currentUser,
			});
		};
	}
}
