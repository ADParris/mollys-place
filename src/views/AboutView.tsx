import React from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { IViewProps, Sizes, Strings } from 'data/constants';
import { setSize } from 'utils/helpers';

import { BannerImage, Text } from 'components';

export const AboutView: React.FC<IViewProps> = ({ banner, id }) => {
	const innerBorderSize = useColorModeValue(16.389, 16);

	const {
		site: { owner, title },
	} = Strings;

	return (
		<Flex flex={1}>
			<Flex flex={1} flexDir="column">
				<Text
					as="h1"
					fontFamily="Great Vibes"
					fontWeight="normal"
					mb={setSize(Sizes.gap)}
					textAlign="center"
				>
					{`Welcome to ${title}!`}
				</Text>
				<Text alignItems="flex-start">
					&nbsp;&nbsp;&nbsp;&nbsp;Welcome to my little spot on the
					internet, I hope you enjoy your visit!
				</Text>
			</Flex>
			<Flex alignItems="center" flex={1} flexDir="column">
				<Flex
					alignItems="center"
					border={`${setSize(0.278)} solid goldenrod`}
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
					mb={setSize(Sizes.gap)}
					textAlign="center"
				>
					Hi, I'm&nbsp;
					<Flex as="span" display="inline-flex" fontFamily="Great Vibes">
						{owner}
					</Flex>
					.
				</Text>
			</Flex>
		</Flex>
	);
};
