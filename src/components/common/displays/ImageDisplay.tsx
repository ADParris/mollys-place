import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { IPost } from 'data/models';

interface IComponentProps {
	image: IPost['content']['image'];
}

export const ImageDisplay: React.FC<IComponentProps> = ({ image }) => (
	<Flex justifyContent="center">
		<Image
			alt={image!.name}
			src={image!.data}
			objectFit="cover"
			quality={100}
		/>
	</Flex>
);
