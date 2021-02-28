import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Body } from './Body';
import { Header } from './Header';

interface ComponentProps {}

export const Layout: React.FC<ComponentProps> = () => {
	return (
		<Flex direction="column" flex="1">
			<Header />
			<Body />
		</Flex>
	);
};
