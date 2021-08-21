import React from 'react';

import { Flex } from '@chakra-ui/react';

import { SiteLogo, Text } from 'components';

interface IComponentProps {}

export const CopyRight: React.FC<IComponentProps> = () => (
	<Flex alignItems="center" lineHeight={1.2}>
		<Text as="span" textAlign="center">
			{`© ${new Date().getFullYear()}`}&nbsp;
		</Text>
		<SiteLogo />
	</Flex>
);
