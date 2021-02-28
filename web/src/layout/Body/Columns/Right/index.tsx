import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostActions from '../../../../redux/posts/actions';
import PostSelectors from '../../../../redux/posts/selectors';
import { Composer } from '../../../../components/Composer';
import { Post } from '../../../../components/Post';

export const RightColumn: React.FC = () => {
	const { retrievePosts } = new PostActions();
	const { selectPostsList } = new PostSelectors();
	const posts = useSelector(selectPostsList);
	const dispatch = useDispatch();

	React.useEffect(() => {
		posts.length === 0 && dispatch(retrievePosts());
	}, [dispatch, posts, retrievePosts]);

	const postsList =
		posts && posts.map(post => <Post key={post.id} {...post} />);

	return (
		<Box position="relative" w="100%">
			<Flex direction="column" grow={1}>
				<Composer />
				{postsList && postsList}
			</Flex>
		</Box>
	);
};
