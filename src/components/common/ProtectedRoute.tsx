import { Divider, Flex } from '@chakra-ui/react';
import React from 'react';

import { Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';

import { Text } from './Text';

interface IComponentProps {}

export const ProtectedRoute: React.FC<IComponentProps> = () => {
	return (
		<Flex alignItems="center" flexDir="column">
			<Text
				as="h1"
				fontFamily="Great Vibes"
				fontSize="3em"
				fontWeight="normal"
				textAlign="center"
			>
				~ Private ~
			</Text>
			<Text
				as="h3"
				fontStyle="italic"
				mb={setSize(Sizes.gap)}
				textAlign="center"
			>
				The content you are attempting to view is for authenticated users
				only!
			</Text>
			<Flex flexDir="column" maxW="80%">
				<Divider mb={setSize(Sizes.gap)} />
				<Text>
					&nbsp;&nbsp;&nbsp;&nbsp;If you know Molly, you will need to
					contact her in order to become a member of this site.
				</Text>
			</Flex>
		</Flex>
	);
};
