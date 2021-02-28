import { Box, ButtonGroup, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButtonOrLink } from '../../CustomButtonOrLink';
import ComposerActions from '../../../redux/composer/actions';
import ComposerSelectors from '../../../redux/composer/selectors';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { AddImageButton } from './AddImageButton';
import { iSelectedState } from '../../../types/post';
import Youtube from '../../../api/youtube';

interface ComponentProps {
	handleSubmit: () => void;
}

export const ComposerFooter: React.FC<ComponentProps> = ({ handleSubmit }) => {
	const { setContent } = new ComposerActions();
	const {
		selectComposerContent,
		selectComposerIsActive,
	} = new ComposerSelectors();
	const { processVideo } = new Youtube();
	const dispatch = useDispatch();

	// Redux store...
	const content = useSelector(selectComposerContent);
	const isActive = useSelector(selectComposerIsActive);

	// Component state...
	const [isOpen, setIsOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<iSelectedState | undefined>(
		undefined
	);

	const handleClick = () => setIsOpen(prevState => !prevState);

	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter') {
			const video = await processVideo(
				(event.target as HTMLInputElement).value
			);
			handleSelection({ type: 'video', payload: video });
			setIsOpen(false);
		}
	};

	const handleSelection = (selected: iSelectedState) => {
		setSelected(selected);
	};

	React.useEffect(() => {
		if (selected) {
			dispatch(
				setContent({
					...content,
					[selected.type]: selected.payload,
				})
			);
			setSelected(undefined);
		}
	}, [content, dispatch, selected, setContent, setSelected]);

	return (
		<Box
			bgGradient={colors.default.gradientBackground}
			borderBottomLeftRadius={sizes.border.radius}
			borderBottomRightRadius={sizes.border.radius}
		>
			{isOpen && (
				<Flex justify="center">
					<Input
						_placeholder={{ color: colors.default.text.faded }}
						bg={colors.default.background}
						color={colors.default.text.dark}
						my={2}
						onKeyDown={handleKeyDown}
						placeholder="Youtube link..."
						w="90%"
					/>
				</Flex>
			)}
			<Flex
				color={colors.default.text.light}
				justify="space-between"
				p={sizes.gap.inner}
			>
				<ButtonGroup spacing={2}>
					<AddImageButton handleSelection={handleSelection} />
					<CustomButtonOrLink handleClick={handleClick} text="Video" />
				</ButtonGroup>
				{isActive && (
					<CustomButtonOrLink
						background
						handleClick={handleSubmit}
						text="Post"
					/>
				)}
			</Flex>
		</Box>
	);
};
