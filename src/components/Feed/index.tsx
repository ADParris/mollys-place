import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useDispatch, useSelector } from 'react-redux';

import { PostFilterTypes } from 'data/models';
import {
	selectPosts,
	setPosts,
	selectUser,
	resetPostsSlice,
} from 'data/store';

import { AddPostButton } from './AddPost';
import { Post } from './Post';
import { Text } from 'components';

interface IComponentProps {
	filter: PostFilterTypes;
}

export const Feed: React.FC<IComponentProps> = ({ filter }) => {
	const { cursor, error, isEnd, list, loading, prevFilter } =
		useSelector(selectPosts);
	const { current: currentUser } = useSelector(selectUser);
	const dispatch = useDispatch();

	const loadMore = React.useCallback(() => {
		dispatch(setPosts({ cursor, filter, isAuthed: !!currentUser }));
	}, [currentUser, cursor, dispatch, filter]);

	const [sentryRef] = useInfiniteScroll({
		delayInMs: 1000,
		disabled: !!error,
		hasNextPage: !isEnd,
		loading,
		onLoadMore: loadMore,
		rootMargin: '0px 0px 400px 0px',
	});

	React.useEffect(() => {
		if (filter !== prevFilter) {
			dispatch(resetPostsSlice());
		}
	}, [dispatch, filter, prevFilter]);

	return (
		<Flex alignItems="center" flexDir="column" w="full">
			<Flex
				alignItems="center"
				css={{ '&::-webkit-scrollbar': { display: 'none' } }}
				flexDir="column"
				w="full"
			>
				{error ? (
					<Flex>{error.message}</Flex>
				) : (
					list && list.map(post => <Post key={post.id} post={post} />)
				)}
				{loading || !isEnd ? (
					<Spinner ref={sentryRef} />
				) : (
					<Flex>
						<Text fontFamily="Great Vibes" fontSize="2rem">
							~ The End ~
						</Text>
					</Flex>
				)}
			</Flex>
			{currentUser && currentUser.role === `admin` && <AddPostButton />}
		</Flex>
	);
};
