import React from 'react';

import { Flex } from '@chakra-ui/react';

import { IPost } from 'data/models';
import { useColors } from 'utils/hooks';

import { ImageDisplay, VideoDisplay } from 'components';

interface IComponentProps {
	content: IPost['content'];
}

export const Preview: React.FC<IComponentProps> = ({ content }) => {
	const { surfaceColor } = useColors();

	return (
		<Flex bg={surfaceColor} justifyContent="center">
			{content.image ? (
				<ImageDisplay image={content.image} />
			) : (
				<VideoDisplay video={content.video} />
			)}
		</Flex>
	);
};
