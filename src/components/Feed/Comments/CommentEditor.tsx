import React from 'react';

import { Flex } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { Colors, Sizes } from 'data/constants';
import { IPost, IUser } from 'data/models';
import { setSize } from 'utils/helpers';
import { useComment } from 'utils/hooks';

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
	const { content, errMsg, handleChange, handleKeyPress } = useComment({
		cid,
		creator: currentUser,
		post,
	});
	errMsg && console.error(errMsg);

	return (
		<Flex
			__css={{
				'& ::placeholder': { color: Colors.dark.secondaryTextColor },
			}}
			alignItems="center"
			bgColor="white"
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
					color: 'black',
					outline: 'none',
					overflow: 'hidden',
					width: '100%',
				}}
				value={content}
			/>
		</Flex>
	);
};
