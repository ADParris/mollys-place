import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import PostActions from '../../../redux/posts/actions';
import { colors } from '../../../theme/colors';
import { iPost } from '../../../types/post';

interface ComponentProps {
	id: iPost['id'];
	image: iPost['content']['image'];
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostHeaderMenu: React.FC<ComponentProps> = ({
	id,
	image,
	setIsEditing,
}) => {
	const { deletePost } = new PostActions();
	const { colorMode } = useColorMode();
	const dispatch = useDispatch();

	const textColor =
		colorMode === 'light'
			? colors.default.text.dark
			: colors.default.text.light;

	const handleEdit = () => setIsEditing(true);

	const handleDelete = () => dispatch(deletePost({ id, image }));

	return (
		<Menu>
			<MenuButton
				_active={{ bg: 'whiteAlpha.400' }}
				_hover={{ bg: 'whiteAlpha.400' }}
				as={IconButton}
				aria-label="Options"
				bg="whiteAlpha.200"
				icon={<ChevronDownIcon />}
				size="xs"
				variant="outline"
			/>
			<MenuList>
				<MenuItem color={textColor} icon={<EditIcon />} onClick={handleEdit}>
					Edit Post
				</MenuItem>
				<MenuItem
					color={textColor}
					icon={<DeleteIcon />}
					onClick={handleDelete}
				>
					Delete Post
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
