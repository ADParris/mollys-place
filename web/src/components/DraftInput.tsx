import { Flex } from '@chakra-ui/react';
import { Editor, EditorState } from 'draft-js';
import React from 'react';
import { useSelector } from 'react-redux';
import ComposerSelectors from '../redux/composer/selectors';
import SystemSelectors from '../redux/system/selectors';
import { colors } from '../theme/colors';
import { iCreatingContentObj } from '../types/post';

interface ComponentProps {
	editorState: EditorState;
	handleContentChange: ({ type, payload }: iCreatingContentObj) => void;
	hasMedia: boolean;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export const DraftInput: React.FC<ComponentProps> = ({
	editorState,
	handleContentChange,
	hasMedia,
	setEditorState,
}) => {
	const {
		selectComposerBackground,
		selectComposerIsActive,
	} = new ComposerSelectors();
	const { selectCurrentUser } = new SystemSelectors();

	// Redux store...
	const background = useSelector(selectComposerBackground);
	const isActive = useSelector(selectComposerIsActive);
	const user = useSelector(selectCurrentUser);

	// Component variables...
	const currentText = editorState.getCurrentContent().getPlainText();
	const fontSize =
		isActive && !hasMedia && currentText.length < 80 ? '2rem' : '1.25rem';

	// Component handlers...
	const handleChange = (editorState: EditorState) => {
		setEditorState(editorState);
		const text:
			| string
			| undefined = editorState.getCurrentContent().getPlainText();

		text &&
			text.length > 0 &&
			handleContentChange({ type: 'text', payload: text });
	};

	return (
		<Flex
			align={background ? 'center' : 'flex-start'}
			color={background ? colors.default.text.light : colors.default.text.dark}
			fontSize={fontSize}
			fontWeight={background ? 'bold' : 'inherit'}
			minH={background ? '20.801rem' : '6rem'}
			sx={draftStyles(background)}
			textAlign={background ? 'center' : 'inherit'}
		>
			<Editor
				editorState={editorState}
				onChange={editorState => handleChange(editorState)}
				placeholder={user && `What's on your mind, ${user.name.first}?`}
			/>
		</Flex>
	);
};

const draftStyles = (background: string | undefined) => ({
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
