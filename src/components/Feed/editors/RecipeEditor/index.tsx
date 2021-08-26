import React from 'react';

import { Flex, Input } from '@chakra-ui/react';

import { Colors, Sizes } from 'data/constants';
import { IPost, IPostRecipe } from 'data/models';
import { setSize } from 'utils/helpers';
import { usePost } from 'utils/hooks';

import { Text } from 'components';
import { DescriptionBox } from './DescriptionBox';
import { DirectionsBox } from './DirectionsBox';
import { ImageBox } from './ImageBox';
import { IngredientsBox } from './IngredientsBox';

interface IComponentProps {
	post?: IPost;
}

export const RecipeEditor: React.FC<IComponentProps> = ({ post }) => {
	const { content, handleContentChange } = usePost(post);

	const initialState: IPostRecipe = {
		description: ``,
		directions: ``,
		image: {} as IPostRecipe['image'],
		ingredients: [] as IPostRecipe['ingredients'],
		name: ``,
	};

	const recipe = content?.recipe ? content.recipe : initialState;

	const handleChange = (change: IPostRecipe) =>
		handleContentChange({
			recipe: { ...recipe!, ...change },
		} as IPost['content']);

	return (
		<Flex
			as="article"
			flexDir="column"
			color={Colors.light.primaryTextColor}
		>
			<Flex>
				<Flex
					as="section"
					flex={1}
					flexDir="column"
					mr={setSize(Sizes.gap)}
				>
					<Text as="h4">Name</Text>
					<Input
						_hover={{ borderColor: Colors.dark.surfaceColor }}
						border={`${setSize(0.056)} solid`}
						borderColor={Colors.dark.surfaceColor}
						mb={setSize(Sizes.gap / 2)}
						onChange={e =>
							handleChange({ name: e.target.value } as IPostRecipe)
						}
						type="text"
						value={recipe?.name}
					/>
					<ImageBox handleChange={handleChange} preview={recipe?.image} />
					<DescriptionBox
						handleChange={handleChange}
						text={recipe?.description}
					/>
				</Flex>
				<IngredientsBox
					handleChange={handleChange}
					ingredients={recipe?.ingredients}
				/>
			</Flex>
			<DirectionsBox
				handleChange={handleChange}
				text={recipe?.directions}
			/>
		</Flex>
	);
};
