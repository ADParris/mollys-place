import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { sizes } from '../../../theme/sizes';

export const Container: React.FC = ({ children }) => {
	return (
		<Box mb={sizes.gap.outer} position="relative" w="100%">
			<Flex direction="column" grow={1}>
				{children}
			</Flex>
		</Box>
	);
};
