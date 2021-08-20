import React from 'react';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';

import { customTheme, Sizes } from 'utils';
import { HomeView } from 'views';

export const App: React.FC = () => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	return (
		<ChakraProvider resetCSS theme={customTheme}>
			<HomeView isLargeScreen={isLargeScreen} />
		</ChakraProvider>
	);
};
