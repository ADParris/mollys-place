import { Box, Flex } from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { colors } from '../../../theme/colors';
import { DraftInput, draftStyles } from '../../DraftInput';

interface iComponentProps {}

export const CommentInput: React.FC<iComponentProps> = () => {
	const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty()
	);

	const handleSetEditorState = (editorState: EditorState) =>
		setEditorState(editorState);

	const handleSubmit = () => {
		const text = editorState.getCurrentContent().getPlainText();
		text && console.log(text);
	};

	return (
		<Box>
			<Flex
				color={colors.default.text.dark}
				fontSize="1.25rem"
				sx={draftStyles()}
			>
				<DraftInput
					editorState={editorState}
					handleSetEditorState={handleSetEditorState}
					handleSubmit={handleSubmit}
					placeholder="Write a comment..."
				/>
			</Flex>
		</Box>
	);
};
