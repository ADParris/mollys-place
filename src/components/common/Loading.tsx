import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';

import { Sizes, Strings } from 'data/constants';
import { setSize } from 'utils/helpers';

import { Text } from './Text';

interface IComponentProps {}

export const Loading: React.FC<IComponentProps> = () => {
	const {
		site: { title },
	} = Strings;

	return (
		<Flex
			alignItems="center"
			flex={1}
			flexDir="column"
			h="100vh"
			justifyContent="center"
		>
			<Text as="h1" fontFamily="Great Vibes" mb={setSize(Sizes.gap)}>
				{title}
			</Text>
			<Spinner size="lg" />
		</Flex>
	);
};
