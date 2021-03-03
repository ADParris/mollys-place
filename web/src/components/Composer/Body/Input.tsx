import { Flex } from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { useSelector } from 'react-redux';
import ComposerSelectors from '../../../redux/composer/selectors';
import SystemSelectors from '../../../redux/system/selectors';
import { colors } from '../../../theme/colors';
import { DraftInput, draftStyles } from '../../DraftInput';

interface iComponentProps {
	editorState: EditorState;
	handleSetEditorState: (editorState: EditorState) => void;
	hasMedia?: boolean;
}

export const ComposerBodyInput: React.FC<iComponentProps> = ({
	editorState,
	handleSetEditorState,
	hasMedia,
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
			<DraftInput
				editorState={editorState}
				handleSetEditorState={handleSetEditorState}
				placeholder={user && `What's on your mind, ${user.name.first}?`}
			/>
		</Flex>
	);
};
