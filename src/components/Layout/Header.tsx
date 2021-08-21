import { Flex } from '@chakra-ui/react';
import React from 'react';

import { Colors, Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';

import { SiteLogo } from 'components';
import { SiteMenu, UserMenu } from 'components';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const Header: React.FC<IComponentProps> = ({ isLargeScreen }) => (
	<Flex
		as="header"
		bgGradient={Colors.gradient}
		flex={1}
		justifyContent="center"
		mb={setSize(Sizes.gap)}
		maxH={setSize(Sizes.hfMaxHeight)}
		minH={setSize(Sizes.hfMaxHeight)}
		position="sticky"
		top={0}
		zIndex={1}
	>
		<Flex
			alignItems="center"
			flex={1}
			maxW={setSize(Sizes.maxWidth)}
			mx={isLargeScreen ? 0 : setSize(Sizes.gap)}
			justifyContent="space-between"
		>
			{!isLargeScreen && <SiteMenu isLargeScreen={isLargeScreen} />}
			<Flex alignItems="center">
				<SiteLogo large />
			</Flex>
			<Flex>
				<UserMenu />
			</Flex>
		</Flex>
	</Flex>
);
