import { Flex } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme/colors';
import { sizes } from '../../theme/sizes';
import { Logo } from './Logo';
import { Menu } from './Menu';

export const Header: React.FC = () => {
	return (
		<>
			<Flex
				bgGradient={colors.default.gradientBackground}
				h={sizes.heights.header}
				justify="center"
				mb={sizes.gap.outer}
				position="sticky"
				top={0}
				zIndex="1"
			>
				<Flex
					align="center"
					color={colors.default.text.light}
					grow={1}
					justify="space-between"
					maxW={sizes.widths.header}
				>
					<Logo />
					<Menu />
				</Flex>
			</Flex>
		</>
	);
};
