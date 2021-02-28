import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';

export const PostFooter: React.FC = () => {
	return (
		<Box
			bgGradient={colors.default.gradientBackground}
			borderBottomLeftRadius={sizes.border.radius}
			borderBottomRightRadius={sizes.border.radius}
		>
			<Box color={colors.default.text.light} p={sizes.gap.inner}>
				<Text>Post Footer</Text>
			</Box>
		</Box>
	);
};
