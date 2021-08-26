import React from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Colors } from 'data/constants';
import { IPost } from 'data/models';

import { ImageDisplay, VideoDisplay } from 'components';

interface IComponentProps {
	content: IPost['content'];
}

export const Preview: React.FC<IComponentProps> = ({ content }) => {
	const bg = useColorModeValue(
		Colors.light.surfaceColor,
		Colors.dark.surfaceColor
	);

	return (
		<Flex bg={bg} justifyContent="center">
			{content.image ? (
				<ImageDisplay image={content.image} />
			) : (
				<VideoDisplay video={content.video} />
			)}
		</Flex>
	);
};
