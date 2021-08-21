import React from 'react';

import { Flex } from '@chakra-ui/react';

import { ColorModeSwitcher, Text } from 'components';
import { IViewProps } from 'data';

export const SignInView: React.FC<IViewProps> = ({
	id,
	isLargeScreen,
}) => {
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
					textTransform="capitalize"
				>
					{id}
				</Text>
			</Flex>
		</>
	);
};
