import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SystemSelectors from '../../../redux/system/selectors';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { iPost } from '../../../types/post';
import { PostHeaderMenu } from './Menu';

interface ComponentProps {
	createdAt: string;
	creator: iPost['creator'];
	id: iPost['id'];
	image: iPost['content']['image'];
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostHeader: React.FC<ComponentProps> = ({
	createdAt,
	creator,
	id,
	image,
	setIsEditing,
}) => {
	const { selectCurrentUser } = new SystemSelectors();

	// Redux store...
	const currentUser = useSelector(selectCurrentUser);

	const ownsPost = creator.id === currentUser?.id;

	return (
		<Box
			bgGradient={colors.default.gradientBackground}
			borderTopLeftRadius={sizes.border.radius}
			borderTopRightRadius={sizes.border.radius}
		>
			<Box color={colors.default.text.light} p={sizes.gap.inner}>
				<Flex justify="space-between">
					<Link to={`/${creator.profile}`}>
						<Text>{creator.name}</Text>
					</Link>
					{ownsPost && (
						<PostHeaderMenu id={id} image={image} setIsEditing={setIsEditing} />
					)}
				</Flex>
				<Text fontSize="0.8rem">{new Date(createdAt).toLocaleString()}</Text>
			</Box>
		</Box>
	);
};
