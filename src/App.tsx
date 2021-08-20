import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import { customTheme, strings } from './constants';

import { ColorModeSwitcher, Text } from './components';

export const App: React.FC = () => {
	const { title } = strings.site;

	return (
		<ChakraProvider resetCSS theme={customTheme}>
			<ColorModeSwitcher position="fixed" right={5} top={5} />
			<Flex
				alignItems="center"
				flex={1}
				flexDir="column"
				justifyContent="center"
				minH="100vh"
			>
				<Text
					as="h1"
					fontFamily="Great Vibes"
					fontSize="5xl"
					fontWeight="normal"
					textShadow="2px 1px 1px #5c5f72"
				>
					{title}
				</Text>
			</Flex>
		</ChakraProvider>
	);
};
