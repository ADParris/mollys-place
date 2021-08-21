import React from 'react';

import { Flex, Link } from '@chakra-ui/react';

import { setSize } from 'utils/helpers';
import { ReactLogo, Text } from 'components';

interface IComponentProps {}

export const PoweredBy: React.FC<IComponentProps> = () => (
	<Flex alignItems="center" lineHeight={1.2}>
		<Text textAlign="center">Powered by</Text>
		<Link
			_hover={{ color: `#0cc6f8` }}
			alignItems="center"
			color="#61DAFB"
			display="flex"
			flexDir="row"
			href="https://reactjs.com/"
			isExternal
		>
			<ReactLogo h={setSize(2)} w={setSize(2)} />
			<Text>React</Text>
		</Link>
	</Flex>
);
