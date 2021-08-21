import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';

import { Text } from 'components';

interface IComponentProps {
	recipe: IPost['content']['recipe'];
}

export const RecipeDisplay: React.FC<IComponentProps> = ({ recipe }) => {
	return (
		<Flex flexDir="column" m={setSize(Sizes.gap / 2)}>
			<Text
				as="h2"
				fontFamily="Great Vibes"
				mb={setSize(Sizes.gap / 2)}
				textAlign="center"
			>
				{recipe!.name}
			</Text>
			<Flex>
				<Flex flex={1} flexDir="column" mr={setSize(Sizes.gap / 1.5)}>
					<Image src={recipe!.image.data} />
					<Text as="h4" mt={setSize(Sizes.gap / 2)}>
						Description
					</Text>
					<Text>{recipe!.description}</Text>
				</Flex>
				<Flex flex={1} flexDir="column">
					<Text as="h4">Ingredients</Text>
					{recipe!.ingredients.map((ingredient, index) => (
						<Text key={index}>{ingredient}</Text>
					))}
				</Flex>
			</Flex>
			<Text as="h4" mt={setSize(Sizes.gap / 2)}>
				Directions
			</Text>
			<Text>{recipe!.directions}</Text>
		</Flex>
	);
};
