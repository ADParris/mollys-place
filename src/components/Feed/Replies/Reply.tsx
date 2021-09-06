import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { Sizes } from 'data/constants';
import { IPost, IPostComment, IPostReply } from 'data/models';
import { selectUser } from 'data/store/user';
import { setSize } from 'utils/helpers';
import { useColors, useReply } from 'utils/hooks';

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

	const { primaryTextColor, surfaceColor } = useColors();

	return (
		<Flex my={setSize(Sizes.gap / 2)}>
			<Flex mt={setSize(0.2)}>
				<AvatarDisplay user={reply.creator} />
			</Flex>
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
							bgColor={surfaceColor}
							borderRadius={setSize(Sizes.borderRadius)}
							mr={setSize(Sizes.gap / 2)}
							p={setSize(Sizes.gap / 2)}
							w="fit-content"
						>
							<Text color={primaryTextColor}>{reply.content}</Text>
						</Flex>
						{canModify && (
							<MoreMenu handleDelete={handleDelete} rid={reply.id} small />
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
					<Flex as="span">{moment(reply.createdAt).fromNow()}</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
