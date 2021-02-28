import { ContentState, EditorState } from 'draft-js';
import { iCreatingContentObj, iPost } from '../../../types/post';
import { iUser } from '../../../types/user';
import Creating from './creating';

interface iContentChangeProps {
	change: iCreatingContentObj;
	content?: iPost['content'];
}

interface iSubmitProps {
	background?: string;
	content?: iPost['content'];
	currentUser: iUser;
}

export default class Handling {
	_creating = new Creating();

	contentChange: ({
		change: { type, payload },
		content,
	}: iContentChangeProps) => iPost['content'] | undefined;

	reset: (editorState: EditorState) => EditorState;

	submit: ({
		background,
		content,
		currentUser,
	}: iSubmitProps) => iPost | undefined;

	constructor() {
		this.contentChange = ({
			change: { type, payload },
			content,
		}: iContentChangeProps): iPost['content'] | undefined => {
			switch (type) {
				case 'text':
					return content
						? ({ ...content, text: payload } as iPost['content'])
						: ({ text: payload } as iPost['content']);
				default:
					return;
			}
		};

		this.reset = (editorState: EditorState) => {
			const newEditorState = EditorState.push(
				editorState,
				ContentState.createFromText(''),
				'remove-range'
			);
			return newEditorState;
		};

		this.submit = ({ background, content, currentUser }: iSubmitProps) => {
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
