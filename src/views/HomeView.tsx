import { Flex } from '@chakra-ui/react';
import React from 'react';

import { ColorModeSwitcher, Text } from 'components';
import { Strings } from 'utils';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const HomeView: React.FC<IComponentProps> = ({ isLargeScreen }) => {
	const { title } = Strings.site;

	return (
		<>
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
		</>
	);
};
