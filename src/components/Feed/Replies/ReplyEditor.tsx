import React from 'react';

import { Flex } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { Colors, Sizes } from 'data/constants';
import { IPost, IPostComment, IPostReply, IUser } from 'data/models';
import { setSize } from 'utils/helpers';
import { useReply } from 'utils/hooks';

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
	const { content, handleChange, handleKeyPress } = useReply({
		cid,
		creator: currentUser,
		post,
		rid,
	});

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
			w="full"
		>
			<TextareaAutosize
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				placeholder="Write a reply..."
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
