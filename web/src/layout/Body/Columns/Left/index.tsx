import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const LeftColumn: React.FC = () => {
	return (
		<Box position="relative" w="100%">
			<Flex direction="column" grow={1}>
				<Text>Left Column</Text>
			</Flex>
		</Box>
	);
};
