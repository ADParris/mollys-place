import { Box, Flex, Image } from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleEmoji } from '../../../helpers';
import ComposerActions from '../../../redux/composer/actions';
import ComposerSelectors from '../../../redux/composer/selectors';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { VideoDisplay } from '../../Displays/Video';
import { Emojis } from '../../Emojis';
import { Backgrounds } from './Backgrounds';
import { ComposerBodyInput } from './Input';

interface ComponentProps {
	editorState: EditorState;
	handleSetEditorState: (editorState: EditorState) => void;
}

export const ComposerBody: React.FC<ComponentProps> = ({
	editorState,
	handleSetEditorState,
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

	const handleInsertEmoji = (emoji: string) => {
		const insert = handleEmoji({ editorState, emoji });
		handleSetEditorState(insert);
	};

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
			<ComposerBodyInput
				editorState={editorState}
				handleSetEditorState={handleSetEditorState}
			/>
			{isActive && (
				<Flex align="flex-end" justify="space-between">
					{!hasMedia && <Backgrounds />}
					<Emojis onEmoji={handleInsertEmoji} />
				</Flex>
			)}
			{content?.image && (
				<Image src={content.image.link} alt={content.image.name} />
			)}
			{content?.video && <VideoDisplay video={content.video} />}
		</Box>
	);
};
