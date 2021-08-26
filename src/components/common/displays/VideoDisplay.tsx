import React from 'react';

import {
	Flex,
	Image,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { Colors, Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';

interface IComponentProps {
	video: IPost['content']['video'];
}

export const VideoDisplay: React.FC<IComponentProps> = ({ video }) => {
	const color = useColorModeValue(
		Colors.dark.surfaceColor,
		Colors.light.surfaceColor
	);

	return (
		<Link href={`https://www.youtube.com/watch?v=${video!.id}`} isExternal>
			<Flex justifyContent="center">
				<Image alt={video!.title} src={video!.image} objectFit="contain" />
			</Flex>
			<Flex color={color} flexDir="column" m={setSize(Sizes.gap / 2)}>
				<Text
					fontSize={setSize(0.75)}
					fontWeight="thin"
					letterSpacing="wider"
					textTransform="uppercase"
				>
					youtube.com
				</Text>
				<Text
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
