import React from 'react';

import { Flex } from '@chakra-ui/react';

import { setSize } from 'utils/helpers';
import { Sizes } from 'data/constants';
import { usePost } from 'utils/hooks';

import { PostEditor, RecipeEditor } from 'components/Feed/editors';

interface IComponentProps {}

export const ModalBody: React.FC<IComponentProps> = () => {
	const { background: bg, isComposing } = usePost();

	return (
		<Flex
			bgColor={bg ? bg : 'white'}
			borderLeft="0.1rem solid #6B46C1"
			borderRight="0.1rem solid #6B46C1"
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			{isComposing.recipe ? <RecipeEditor /> : <PostEditor />}
		</Flex>
	);
};
