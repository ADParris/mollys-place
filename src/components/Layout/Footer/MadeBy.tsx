import React from 'react';

import { Flex, Link, Text } from '@chakra-ui/react';

interface IComponentProps {}

export const MadeBy: React.FC<IComponentProps> = () => (
	<Flex alignItems="center" lineHeight={2}>
		<Text textAlign="center">Made with ❤️ by&nbsp;</Text>
		<Link href="https://adparris.com" isExternal>
			Andrew Parris
		</Link>
	</Flex>
);
