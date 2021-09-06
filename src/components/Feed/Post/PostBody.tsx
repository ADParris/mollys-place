import React from 'react';

import { Flex } from '@chakra-ui/react';

import { IPost } from 'data/models';

import {
	ImageDisplay,
	RecipeDisplay,
	TextDisplay,
	VideoDisplay,
} from 'components';
import { useColors } from '../../../utils/hooks';

interface IComponentProps {
	background?: IPost['background'];
	content: IPost['content'];
}

export const PostBody: React.FC<IComponentProps> = ({
	background,
	content,
}) => {
	const { surfaceColor } = useColors();

	return (
		<Flex
			bgColor={surfaceColor}
			borderLeft="0.1rem solid #6B46C1"
			borderRight="0.1rem solid #6B46C1"
			flex={1}
			flexDir="column"
			w="full"
		>
			{content.text && (
				<TextDisplay background={background} text={content.text} />
			)}
			{content.image && <ImageDisplay image={content.image} />}
			{content.recipe && <RecipeDisplay recipe={content.recipe} />}
			{content.video && <VideoDisplay video={content.video} />}
		</Flex>
	);
};
