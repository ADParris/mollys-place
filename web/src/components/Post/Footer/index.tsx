import { Box } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { CommentInput } from '../../Comment/Input';

export const PostFooter: React.FC = () => {
	return (
		<Box
			bg={colors.default.background}
			borderBottomLeftRadius={sizes.border.radius}
			borderBottomRightRadius={sizes.border.radius}
			borderBottomWidth={sizes.border.width}
			borderColor={colors.default.border}
			borderLeftWidth={sizes.border.width}
			borderRightWidth={sizes.border.width}
		>
			<Box color={colors.default.text.light} p={sizes.gap.inner}>
				<CommentInput />
			</Box>
		</Box>
	);
};
