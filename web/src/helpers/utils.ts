import { EditorState, Modifier } from 'draft-js';
import Resizer from 'react-image-file-resizer';

interface iEmojiProps {
	editorState: EditorState;
	emoji: string;
}

export default class Utils {
	capitalize: (word: string) => string;

	handleEmoji: ({ editorState, emoji }: iEmojiProps) => EditorState;

	resizeImage: (
		image: File
	) => Promise<string | File | Blob | ProgressEvent<FileReader>>;

	constructor() {
		this.capitalize = word =>
			word[0].toUpperCase() + word.substring(1).toLowerCase();

		this.handleEmoji = ({ editorState, emoji }: iEmojiProps) => {
			const contentState = editorState.getCurrentContent();
			const currentSelectionState = editorState.getSelection();

			// In case text is selected it is removed and then the new text is added...
			const afterRemovalContentState = Modifier.removeRange(
				contentState,
				currentSelectionState,
				'backward'
			);

			// Get cursor position...
			const targetSelection = afterRemovalContentState.getSelectionAfter();

			// Set addedContent...
			const addedContent = Modifier.insertText(
				afterRemovalContentState,
				targetSelection,
				emoji
			);

			// Push added content into the EditorState...
			const newEditorState = EditorState.push(
				editorState,
				addedContent,
				'insert-characters'
			);

			// Return by forcing the cursor to the end of the added content...
			return EditorState.forceSelection(
				newEditorState,
				addedContent.getSelectionAfter()
			);
		};

		this.resizeImage = image =>
			new Promise(resolve => {
				Resizer.imageFileResizer(
					image,
					700,
					700,
					'JPEG',
					80,
					0,
					uri => {
						resolve(uri);
					},
					'file'
				);
			});
	}
}
