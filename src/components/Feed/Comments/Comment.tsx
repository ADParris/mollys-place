import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { selectUser } from 'data/store/user';

import { Sizes } from 'data/constants';
import { IPost, IPostComment } from 'data/models';
import { setSize } from 'utils/helpers';
import { useColors, useComment } from 'utils/hooks';

import { AvatarDisplay, MoreMenu } from 'components';
import { CommentEditor } from './CommentEditor';
import { Replies } from '../Replies';

interface IComponentProps {
	comment: IPostComment;
	post: IPost;
}

export const Comment: React.FC<IComponentProps> = ({ comment, post }) => {
	const { handleDelete, isEditing, toggleIsReplying } = useComment({
		cid: comment.id,
		creator: comment.creator,
		post,
	});

	const { current: currentUser } = useSelector(selectUser);
	const isAdmin = currentUser?.role === `admin`;
	const isOwner = comment.creator.id === currentUser?.id;
	const canModify = isAdmin || isOwner;

	const { primaryTextColor, surfaceColor } = useColors();

	return (
		<Flex mt={setSize(Sizes.gap)}>
			<Flex mt={setSize(0.2)}>
				<AvatarDisplay user={comment.creator} />
			</Flex>
			<Flex flex={1} flexDir="column">
				{isEditing ? (
					<CommentEditor
						cid={comment.id}
						currentUser={currentUser!}
						post={post}
					/>
				) : (
					<Flex alignItems="center">
						<Flex
							bgColor={surfaceColor}
							borderRadius={setSize(Sizes.borderRadius)}
							mr={setSize(Sizes.gap / 2)}
							p={setSize(Sizes.gap / 2)}
							w="fit-content"
						>
							<Text color={primaryTextColor}>{comment.content}</Text>
						</Flex>
						{canModify && (
							<MoreMenu
								cid={comment.id}
								handleDelete={handleDelete}
								small
							/>
						)}
					</Flex>
				)}
				<Flex fontSize="small" ml={setSize(0.5)} mt={setSize(0.2)}>
					<Button
						fontSize="small"
						fontWeight="normal"
						minW="auto"
						onClick={toggleIsReplying}
						variant="link"
					>
						Reply
					</Button>
					<Flex as="span" mx={setSize(Sizes.gap / 4)}>
						·
					</Flex>
					<Flex as="span">{moment(comment.createdAt).fromNow()}</Flex>
				</Flex>
				<Replies
					comment={comment}
					currentUser={currentUser!}
					post={post}
				/>
			</Flex>
		</Flex>
	);
};
