import {
	DraftHandleValue,
	Editor,
	EditorState,
	getDefaultKeyBinding,
} from 'draft-js';
import React from 'react';
import { colors } from '../../theme/colors';
import { resetEditorState } from './utils';

interface iComponentProps {
	editorState: EditorState;
	handleSetEditorState: (editorState: EditorState) => void;
	handleSubmit?: () => void;
	placeholder?: string;
}

export const DraftInput: React.FC<iComponentProps> = ({
	editorState,
	handleSetEditorState,
	handleSubmit,
	placeholder,
}) => {
	const myKeyBindingFn = (e: React.KeyboardEvent<{}>): string | null =>
		e.key === 'Escape' || e.key === 'Esc'
			? 'esc_command'
			: e.key === 'Enter' && handleSubmit
			? 'enter_command'
			: getDefaultKeyBinding(e);

	const handleKeyCommand = (command: string): DraftHandleValue => {
		if (command === 'esc_command') {
			handleReset();
			return 'handled';
		} else if (command === 'enter_command') {
			if (handleSubmit) {
				handleSubmit();
				handleReset();
				return 'handled';
			}
		}
		return 'not-handled';
	};

	const handleReset = () => {
		const newEditorState = resetEditorState(editorState);
		handleSetEditorState(newEditorState);
	};

	return (
		<Editor
			editorState={editorState}
			handleKeyCommand={handleKeyCommand}
			keyBindingFn={myKeyBindingFn}
			onChange={editorState => handleSetEditorState(editorState)}
			placeholder={placeholder}
		/>
	);
};

export const draftStyles = (background?: string) => ({
	'& .DraftEditor-root': {
		height: '100%',
		position: 'relative',
		width: '100%',
	},
	'& .DraftEditor-editorContainer': {
		position: 'relative',
	},
	'& .public-DraftEditorPlaceholder-root': {
		color: background ? colors.default.text.light : colors.default.text.faded,
		height: '100%',
		opacity: '0.7',
		position: 'absolute',
		width: '100%',
	},
});
