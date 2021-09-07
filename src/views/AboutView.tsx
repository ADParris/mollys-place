import React from 'react';

import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { Helmet } from 'react-helmet-async';

import { IViewProps, Sizes, Strings } from 'data/constants';
import { setSize } from 'utils/helpers';
import { useBoxShadow, useColors } from 'utils/hooks';

import { BannerImage, Text } from 'components';

export const AboutView: React.FC<IViewProps> = ({ banner, id }) => {
	const { normalBoxShadow } = useBoxShadow();
	const innerBorderSize = useColorModeValue(16.389, 16);
	const { surfaceColor } = useColors();
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const {
		site: { owner, title },
	} = Strings;

	const image = (
		<Flex
			alignItems="center"
			flex={isLargeScreen ? 1 : 0}
			flexDir="column"
		>
			<Flex
				alignItems="center"
				border={`${setSize(0.278)} solid`}
				borderColor="purple.600"
				borderRadius={setSize(Sizes.borderRadius + 0.556)}
				justifyContent="center"
			>
				<Flex
					border={`${setSize(0.444)} solid transparent`}
					h={setSize(innerBorderSize)}
					position="relative"
					w={setSize(innerBorderSize)}
				>
					<BannerImage {...banner} id={id} />
				</Flex>
			</Flex>
			<Text
				as="h2"
				fontWeight="normal"
				fontSize="1.25em"
				textAlign="center"
			>
				Hi, I'm&nbsp;
				<Flex as="span" display="inline-flex" fontFamily="Great Vibes">
					{owner}
				</Flex>
				.
			</Text>
		</Flex>
	);

	return (
		<Flex flex={1}>
			<Helmet>
				<title>{`${title} | ${capitalize(id)}`}</title>
			</Helmet>
			<Flex
				flex={1}
				flexDir="column"
				mx={isLargeScreen ? 0 : setSize(Sizes.gap)}
			>
				<Text
					as="h1"
					color="purple.600"
					fontFamily="Great Vibes"
					fontSize={isLargeScreen ? `2rem` : `1.6rem`}
					mb={setSize(Sizes.gap / 1.5)}
					textAlign="center"
				>
					{`Welcome to ${title}!`}
				</Text>
				{!isLargeScreen && image}
				<Flex
					bgColor={surfaceColor}
					borderRadius={setSize(Sizes.borderRadius)}
					boxShadow={normalBoxShadow}
					flexDir="column"
					mt={isLargeScreen ? 0 : setSize(Sizes.gap)}
					p={setSize(Sizes.gap)}
				>
					<Text alignItems="flex-start">
						&nbsp;&nbsp;&nbsp;&nbsp;Welcome to my little spot on the
						internet, I hope you enjoy your visit!
					</Text>
				</Flex>
			</Flex>
			{isLargeScreen && image}
		</Flex>
	);
};
