import { Box, Image } from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraftInput } from '../../DraftInput';
import ComposerActions from '../../../redux/composer/actions';
import ComposerSelectors from '../../../redux/composer/selectors';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { iCreatingContentObj } from '../../../types/post';
import { Backgrounds } from './Backgrounds';
import { VideoDisplay } from '../../Displays/Video';

interface ComponentProps {
	editorState: EditorState;
	handleContentChange: (change: iCreatingContentObj) => void;
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export const ComposerBody: React.FC<ComponentProps> = ({
	editorState,
	handleContentChange,
	setEditorState,
}) => {
	const { setIsActive } = new ComposerActions();
	const {
		selectComposerBackground,
		selectComposerContent,
		selectComposerIsActive,
	} = new ComposerSelectors();
	const dispatch = useDispatch();

	// Redux store...
	const background = useSelector(selectComposerBackground);
	const content = useSelector(selectComposerContent);
	const isActive = useSelector(selectComposerIsActive);

	const hasMedia =
		(!!content?.image as boolean) || (!!content?.video as boolean);

	// Component handlers...
	const handleFocus = () => !isActive && dispatch(setIsActive(true));

	React.useEffect(() => {
		if (!isActive && hasMedia) dispatch(setIsActive(true));
	}, [dispatch, hasMedia, isActive, setIsActive]);

	return (
		<Box
			bg={background ? background : colors.default.background}
			borderColor={colors.default.border}
			borderLeftWidth={sizes.border.width}
			borderRightWidth={sizes.border.width}
			borderWidth={sizes.border.width}
			color={background ? colors.default.text.light : colors.default.text.dark}
			minH="6rem"
			p={sizes.gap.inner}
			onFocus={handleFocus}
		>
			<DraftInput
				editorState={editorState}
				handleContentChange={handleContentChange}
				hasMedia={hasMedia}
				setEditorState={setEditorState}
			/>
			{isActive && !hasMedia && <Backgrounds />}
			{content?.image && (
				<Image src={content.image.link} alt={content.image.name} />
			)}
			{content?.video && <VideoDisplay video={content.video} />}
		</Box>
	);
};
