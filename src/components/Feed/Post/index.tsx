import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';
import { usePost } from 'utils/hooks';

import { PostEditor, RecipeEditor } from 'components/Feed/editors';
import { PostBody } from './PostBody';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface IComponentProps {
	post: IPost;
}

export const Post: React.FC<IComponentProps> = ({ post }) => {
	const { isEditing, handleDelete } = usePost(post);

	return (
		<Flex
			alignItems="center"
			flex={1}
			flexDir="column"
			justifyContent="center"
			m={setSize(Sizes.gap)}
			w="full"
		>
			<PostHeader
				creator={post.creator}
				createdAt={post.createdAt}
				filters={post.filters}
				handleDelete={handleDelete}
				pid={post.id}
			/>
			{isEditing ? (
				<Flex
					bgColor={post.background ? post.background : 'white'}
					borderLeft="0.1rem solid #6B46C1"
					borderRight="0.1rem solid #6B46C1"
					flex={1}
					flexDir="column"
					p={setSize(Sizes.gap / 2)}
					w="full"
				>
					{post.content.recipe ? (
						<RecipeEditor post={post} />
					) : (
						<PostEditor post={post} />
					)}
				</Flex>
			) : (
				<PostBody background={post.background} content={post.content} />
			)}
			<PostFooter post={post} />
		</Flex>
	);
};
