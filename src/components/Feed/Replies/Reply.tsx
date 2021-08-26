import React from 'react';

import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { Colors, Sizes } from 'data/constants';
import { IPost, IPostComment, IPostReply } from 'data/models';
import { selectUser } from 'data/store/user';
import { setSize } from 'utils/helpers';
import { useReply } from 'utils/hooks';

import { AvatarDisplay, MoreMenu } from 'components';
import { ReplyEditor } from './ReplyEditor';

interface IComponentProps {
	cid: IPostComment['id'];
	post: IPost;
	reply: IPostReply;
}

export const Reply: React.FC<IComponentProps> = ({ cid, reply, post }) => {
	const { current: currentUser } = useSelector(selectUser);
	const isAdmin = currentUser?.role === `admin`;
	const isOwner = reply.creator.id === currentUser?.id;
	const canModify = isAdmin || isOwner;

	const { handleDelete, isEditing, toggleIsReplying } = useReply({
		cid,
		creator: currentUser!,
		post,
		rid: reply.id,
	});

	const bgColor = useColorModeValue(
		Colors.light.surfaceColor,
		Colors.dark.surfaceColor
	);
	const color = useColorModeValue(
		Colors.light.primaryTextColor,
		Colors.dark.primaryTextColor
	);

	return (
		<Flex my={setSize(Sizes.gap / 2)}>
			<AvatarDisplay user={reply.creator} />
			<Flex flexDir="column">
				{isEditing ? (
					<ReplyEditor
						cid={cid}
						currentUser={currentUser!}
						post={post}
						rid={reply.id}
					/>
				) : (
					<Flex alignItems="center">
						<Flex
							bgColor={bgColor}
							borderRadius={setSize(Sizes.borderRadius)}
							mr={setSize(Sizes.gap / 2)}
							p={setSize(Sizes.gap / 2)}
							w="fit-content"
						>
							<Text color={color}>{reply.content}</Text>
						</Flex>
						{canModify && (
							<MoreMenu handleDelete={handleDelete} rid={reply.id} small />
						)}
					</Flex>
				)}
				<Flex fontSize="small" ml={setSize(Sizes.gap / 3)}>
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
					<Flex as="span">{moment(reply.createdAt).fromNow()}</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
