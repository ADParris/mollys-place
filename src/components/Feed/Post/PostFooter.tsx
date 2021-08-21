import React from 'react';

import { Flex } from '@chakra-ui/react';

// import { useSelector } from 'react-redux';
// import { selectUser } from 'data/store/user';

import { Colors, Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';

// TODO: Wire up...
// import { Comments } from '../Comments';

interface IComponentProps {
	post: IPost;
}

export const PostFooter: React.FC<IComponentProps> = ({ post }) => {
	// const { current: currentUser } = useSelector(selectUser);

	return (
		<Flex
			borderBottomRadius={setSize(Sizes.borderRadius)}
			bgGradient={Colors.gradient}
			color="whiteAlpha.900"
			minH={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			{/* {currentUser && <Comments currentUser={currentUser} post={post} />} */}
		</Flex>
	);
};
