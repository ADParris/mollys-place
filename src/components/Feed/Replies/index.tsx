import React from 'react';

import { Flex } from '@chakra-ui/react';

import { IPost, IPostComment, IUser } from 'data/models';
import { useReply } from 'utils/hooks';

import { AvatarDisplay } from 'components';
import { RepliesFeed } from './RepliesFeed';
import { ReplyEditor } from './ReplyEditor';

interface IComponentProps {
	comment: IPostComment;
	currentUser: IUser;
	post: IPost;
}

export const Replies: React.FC<IComponentProps> = ({
	comment,
	currentUser,
	post,
}) => {
	const { isReplying } = useReply({
		cid: comment.id,
		creator: currentUser,
		post,
	});

	return (
		<Flex flexDir="column" w="full">
			{comment.replies && <RepliesFeed comment={comment} post={post} />}
			{isReplying && (
				<Flex flex={1}>
					<AvatarDisplay user={currentUser} />
					<ReplyEditor
						cid={comment.id}
						currentUser={currentUser}
						post={post}
					/>
				</Flex>
			)}
		</Flex>
	);
};
