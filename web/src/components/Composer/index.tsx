import { Box } from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StorageMutations } from '../../api/firebase';
import ComposerActions from '../../redux/composer/actions';
import ComposerSelectors from '../../redux/composer/selectors';
import PostActions from '../../redux/posts/actions';
import SystemSelectors from '../../redux/system/selectors';
import { sizes } from '../../theme/sizes';
import { ComposerBody } from './Body';
import { ComposerFooter } from './Footer';
import { ComposerHeader } from './Header';
import PostHandling from './helpers/handling';

export const Composer: React.FC = () => {
	const { resetComposer, setContent } = new ComposerActions();
	const {
		selectComposerBackground,
		selectComposerContent,
	} = new ComposerSelectors();
	const handling = new PostHandling();
	const { createPost } = new PostActions();
	const storageMutations = new StorageMutations();
	const { selectCurrentUser } = new SystemSelectors();
	const dispatch = useDispatch();

	// Redux store...
	const content = useSelector(selectComposerContent);
	const background = useSelector(selectComposerBackground);
	const currentUser = useSelector(selectCurrentUser);

	// Component state...
	const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty()
	);

	// Component handlers...
	const handleSetEditorState = (editorState: EditorState) => {
		setEditorState(editorState);

		const text = editorState.getCurrentContent().getPlainText();
		const newContent = content ? { ...content, text } : { text };
		newContent && dispatch(setContent(newContent));
	};

	const handleReset = async (cancelled: boolean = false) => {
		const newEditorState = handling.reset(editorState);
		setEditorState(newEditorState);
		dispatch(resetComposer());
		if (cancelled && content?.image) {
			await storageMutations.delete(content.image.name);
		}
	};

	const handleSubmit = () => {
		if (currentUser && content) {
			const newPost = handling.submit({ background, content, currentUser });
			newPost && dispatch(createPost(newPost));
			handleReset();
		}
	};

	return (
		<Box mb={sizes.gap.outer}>
			<ComposerHeader handleReset={handleReset} />
			<ComposerBody
				editorState={editorState}
				handleSetEditorState={handleSetEditorState}
			/>
			<ComposerFooter handleSubmit={handleSubmit} />
		</Box>
	);
};
