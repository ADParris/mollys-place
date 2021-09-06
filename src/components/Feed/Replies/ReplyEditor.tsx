import React from 'react';

import { Flex } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { Sizes } from 'data/constants';
import { IPost, IPostComment, IPostReply, IUser } from 'data/models';
import { setSize } from 'utils/helpers';
import { useColors, useReply } from 'utils/hooks';

interface IComponentProps {
	cid: IPostComment['id'];
	currentUser: IUser;
	post: IPost;
	rid?: IPostReply['id'];
}

export const ReplyEditor: React.FC<IComponentProps> = ({
	cid,
	currentUser,
	post,
	rid,
}) => {
	const { primaryTextColor, secondaryTextColor, surfaceColor } =
		useColors();

	const { content, handleChange, handleKeyPress } = useReply({
		cid,
		creator: currentUser,
		post,
		rid,
	});

	return (
		<Flex
			__css={{
				'& ::placeholder': { color: secondaryTextColor },
			}}
			alignItems="center"
			bgColor={surfaceColor}
			borderRadius={setSize(Sizes.borderRadius * 1.5)}
			flex={1}
			flexDir="column"
			pl={setSize(Sizes.gap / 1.4)}
			pr={setSize(Sizes.gap / 3)}
			pt={setSize(Sizes.gap / 2.5)}
			position="relative"
			w="full"
		>
			<TextareaAutosize
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				placeholder="Write a reply..."
				style={{
					backgroundColor: surfaceColor,
					color: primaryTextColor,
					outline: 'none',
					overflow: 'hidden',
					width: '100%',
				}}
				value={content}
			/>
		</Flex>
	);
};
