import React from 'react';

import { Flex } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { Sizes } from 'data/constants';
import { IPost, IUser } from 'data/models';
import { setSize } from 'utils/helpers';
import { useColors, useComment } from 'utils/hooks';

interface IComponentProps {
	cid?: string;
	currentUser: IUser;
	post: IPost;
}

export const CommentEditor: React.FC<IComponentProps> = ({
	cid,
	currentUser,
	post,
}) => {
	const { primaryTextColor, secondaryTextColor, surfaceColor } =
		useColors();

	const { content, errMsg, handleChange, handleKeyPress } = useComment({
		cid,
		creator: currentUser,
		post,
	});
	errMsg && console.error(errMsg);

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
		>
			<TextareaAutosize
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				placeholder="Write a comment..."
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
