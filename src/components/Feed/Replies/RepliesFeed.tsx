import React from 'react';

import { Flex } from '@chakra-ui/react';

import { IPost, IPostComment } from 'data/models';

import { Reply } from './Reply';

interface IComponentProps {
	comment: IPostComment;
	post: IPost;
}

export const RepliesFeed: React.FC<IComponentProps> = ({
	comment,
	post,
}) => {
	const replies = comment.replies;
	const sortByCreatedAt = () =>
		Object.entries(replies!).sort(
			(current, next) => next[1].createdAt - current[1].createdAt
		);

	const replyList = () => {
		const sortedReplies = sortByCreatedAt();
		return sortedReplies.map(reply => (
			<Reply
				cid={comment.id}
				key={reply[0]}
				post={post}
				reply={{ id: reply[0], ...reply[1] }}
			/>
		));
	};

	return <Flex flexDir="column">{replyList()}</Flex>;
};
