import React from 'react';

import { Flex, Image, Link, Text } from '@chakra-ui/react';

import { Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';
import { useColors } from 'utils/hooks';

interface IComponentProps {
	video: IPost['content']['video'];
}

export const VideoDisplay: React.FC<IComponentProps> = ({ video }) => {
	const { primaryTextColor, secondaryTextColor } = useColors();

	return (
		<Link href={`https://www.youtube.com/watch?v=${video!.id}`} isExternal>
			<Flex justifyContent="center">
				<Image alt={video!.title} src={video!.image} objectFit="contain" />
			</Flex>
			<Flex flexDir="column" m={setSize(Sizes.gap / 2)}>
				<Text
					color={secondaryTextColor}
					fontSize={setSize(0.75)}
					fontWeight="thin"
					letterSpacing="wider"
					textTransform="uppercase"
				>
					youtube.com
				</Text>
				<Text
					color={primaryTextColor}
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{video!.title}
				</Text>
			</Flex>
		</Link>
	);
};
