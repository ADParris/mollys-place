import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Sizes } from 'data/constants';
import { IPost, IUser } from 'data/models';
import { setSize } from 'utils/helpers';

import { CommentEditor } from './CommentEditor';
import { CommentFeed } from './CommentFeed';
import { AvatarDisplay } from 'components';

interface IComponentProps {
	currentUser: IUser;
	post: IPost;
}

export const Comments: React.FC<IComponentProps> = ({
	currentUser,
	post,
}) => {
	return (
		<Flex flexDir="column" w="full">
			{post.comments && <CommentFeed post={post} />}
			<Flex flex={1} mt={setSize(Sizes.gap)}>
				<AvatarDisplay user={currentUser} />
				<CommentEditor currentUser={currentUser} post={post} />
			</Flex>
		</Flex>
	);
};
