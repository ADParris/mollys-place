import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ContentState, Editor, EditorState } from 'draft-js';
import React from 'react';
import { useDispatch } from 'react-redux';
import PostActions from '../../../redux/posts/actions';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { iPost } from '../../../types/post';

interface ComponentProps {
	post: iPost;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPost: React.FC<ComponentProps> = ({ post, setIsEditing }) => {
	const { text = '' } = post.content;
	const { updatePost } = new PostActions();
	const dispatch = useDispatch();

	const [editorState, setEditorState] = React.useState(
		EditorState.createWithContent(ContentState.createFromText(text))
	);

	// Component handlers...
	const handleCancel = () => setIsEditing(false);

	const handleUpdate = () => {
		post.content.text = editorState.getCurrentContent().getPlainText();
		dispatch(updatePost(post));
		handleCancel();
	};

	return (
		<Box color={colors.default.text.dark} p={sizes.gap.inner}>
			<Editor editorState={editorState} onChange={setEditorState} />
			<Flex
				align="center"
				borderColor={colors.default.text.faded}
				borderTopWidth="0.1rem"
				color={colors.default.text.faded}
				grow={1}
				h="2rem"
				justify="flex-end"
			>
				<Button color="inherit" onClick={handleUpdate} variant="link">
					Update
				</Button>
				<Text mx={2}>•</Text>
				<Button color="inherit" mr={2} onClick={handleCancel} variant="link">
					Cancel
				</Button>
			</Flex>
		</Box>
	);
};
