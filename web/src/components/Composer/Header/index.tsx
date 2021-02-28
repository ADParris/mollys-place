import { Box, CloseButton, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import ComposerSelectors from '../../../redux/composer/selectors';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';

interface ComponentProps {
	handleReset: (cancelled?: boolean) => void;
}

export const ComposerHeader: React.FC<ComponentProps> = ({ handleReset }) => {
	const { selectComposerIsActive } = new ComposerSelectors();

	// Redux store...
	const isActive = useSelector(selectComposerIsActive);

	return (
		<Box
			bgGradient={colors.default.gradientBackground}
			borderTopLeftRadius={sizes.border.radius}
			borderTopRightRadius={sizes.border.radius}
		>
			<Flex align="center" justify="space-between">
				<Box color={colors.default.text.light} p={sizes.gap.inner}>
					<Text>Create Post</Text>
				</Box>
				{isActive && (
					<CloseButton
						color={colors.default.text.light}
						onClick={() => handleReset(true)}
						size="md"
					/>
				)}
			</Flex>
		</Box>
	);
};
