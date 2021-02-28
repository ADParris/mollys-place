import { Flex } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/sizes';
import { iPost } from '../../../types/post';
import { EditPost } from './EditPost';

import { VideoDisplay } from '../../Displays/Video';
import { ImageDisplay } from '../../Displays/Image';
import { TextDisplay } from '../../Displays/Text';

interface iComponentProps {
	isEditing: boolean;
	post: iPost;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostBody: React.FC<iComponentProps> = ({
	isEditing,
	post,
	setIsEditing,
}) => {
	const { image, text, video } = post.content;

	const background = post.background;
	const hasMedia = !!image || !!video;

	return (
		<Flex
			bg={background ? background : colors.default.background}
			borderColor={colors.default.border}
			borderLeftWidth={sizes.border.width}
			borderRightWidth={sizes.border.width}
			direction="column"
			minH={background ? '25rem' : '6rem'}
			p={sizes.gap.inner}
		>
			{isEditing ? (
				<EditPost post={post} setIsEditing={setIsEditing} />
			) : (
				<>
					{text && (
						<TextDisplay
							hasBackground={!!background}
							hasMedia={hasMedia}
							text={text}
						/>
					)}
				</>
			)}
			{image && <ImageDisplay content image={image} />}
			{video && <VideoDisplay video={video} />}
		</Flex>
	);
};
