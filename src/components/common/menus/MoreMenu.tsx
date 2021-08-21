import React from 'react';

import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { FiDelete, FiEdit, FiMoreHorizontal } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import {
	toggleEditingComment,
	toggleEditingPost,
	toggleEditingReply,
} from 'data/store/system';

import { Colors, Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';

interface IComponentProps {
	cid?: string;
	handleDelete: (id: string) => void;
	pid?: string;
	rid?: string;
	small?: boolean;
}

export const MoreMenu: React.FC<IComponentProps> = ({
	cid,
	handleDelete,
	pid,
	rid,
	small,
}) => {
	const dispatch = useDispatch();

	const color = useColorModeValue(
		Colors.light.primaryTextColor,
		Colors.dark.primaryTextColor
	);

	const handleClick = () => handleDelete(rid ? rid : cid ? cid : pid!);

	const toggleIsEditing = () =>
		dispatch(
			rid
				? toggleEditingReply(rid)
				: cid
				? toggleEditingComment(cid)
				: pid && toggleEditingPost(pid)
		);

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				borderRadius="50%"
				icon={
					<Icon
						as={FiMoreHorizontal}
						color={Colors.dark.secondaryTextColor}
						h={setSize(small ? 0.833 : 1.111)}
						w={setSize(small ? 0.833 : 1.111)}
					/>
				}
				h={setSize(small ? 1.667 : 2.222)}
				minW="auto"
				w={setSize(small ? 1.667 : 2.222)}
				variant="ghost"
			/>
			<MenuList p={setSize(Sizes.gap / 2)} color={color}>
				<MenuItem
					icon={
						<Icon
							as={FiEdit}
							display="flex"
							h={setSize(1.111)}
							w={setSize(1.111)}
						/>
					}
					onClick={toggleIsEditing}
				>
					<Text as="span">Edit</Text>
				</MenuItem>
				<MenuDivider />
				<MenuItem
					icon={
						<Icon
							as={FiDelete}
							display="flex"
							h={setSize(1.111)}
							w={setSize(1.111)}
						/>
					}
					onClick={handleClick}
				>
					<Text as="span">Delete</Text>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
