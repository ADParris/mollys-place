import React from 'react';

import { Avatar, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import moment from 'moment';
import { FiGlobe, FiUsers } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { selectUser } from 'data/store/user';

import { Colors, Sizes } from 'data/constants';
import { IPost, IUser } from 'data/models';
import { setSize } from 'utils/helpers';

import { MoreMenu } from 'components';

interface IComponentProps {
	createdAt: IPost['createdAt'];
	creator: IUser;
	filters: IPost['filters'];
	handleDelete: (id: string) => void;
	pid: IPost['id'];
}

export const PostHeader: React.FC<IComponentProps> = ({
	createdAt,
	creator,
	filters,
	handleDelete,
	pid,
}) => {
	const { current: currentUser } = useSelector(selectUser);
	const isAdmin = currentUser?.role === `admin`;
	const isOwner = creator.id === currentUser?.id;
	const canModify = isAdmin || isOwner;

	const VisibilityIcon = filters.public ? FiGlobe : FiUsers;
	const visibilityLabel = filters.public
		? `public post`
		: `users only post`;

	return (
		<Flex
			bgGradient={Colors.gradient}
			borderTopRadius={setSize(Sizes.borderRadius)}
			h={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			<Avatar
				border="0.1rem solid white"
				name={creator.name}
				h={setSize(2.222)}
				mr={setSize(Sizes.gap / 2)}
				src={creator.image}
				w={setSize(2.222)}
			/>
			<Flex flex={1}>
				<Flex flexDir="column">
					<Text
						color={Colors.dark.primaryTextColor}
						fontWeight="bold"
						letterSpacing="wider"
						lineHeight={1.2}
						mb={setSize(0.1)}
					>
						{creator.name}
					</Text>
					<Flex
						alignItems="center"
						color={Colors.dark.secondaryTextColor}
						lineHeight={1.2}
					>
						<Text
							as="span"
							fontSize="0.8rem"
							fontWeight="hairline"
						>{`${moment(createdAt).fromNow()} · `}</Text>
						<IconButton
							aria-label={visibilityLabel}
							icon={
								<Icon
									as={VisibilityIcon}
									color={Colors.dark.secondaryTextColor}
									h={setSize(0.8)}
									w={setSize(0.8)}
								/>
							}
							h={setSize(1)}
							ml={setSize(0.111)}
							minW="auto"
							w={setSize(1)}
							variant="ghost"
						/>
					</Flex>
				</Flex>
			</Flex>
			{canModify && <MoreMenu handleDelete={handleDelete} pid={pid} />}
		</Flex>
	);
};
