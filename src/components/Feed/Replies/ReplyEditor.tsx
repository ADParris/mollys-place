import React from 'react';

import { Flex } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { Sizes } from 'data/constants';
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
			alignItems="center"
			bgColor="white"
			borderRadius={setSize(Sizes.borderRadius * 1.5)}
			flex={1}
			flexDir="column"
			p={setSize(Sizes.gap / 3)}
			position="relative"
			w="full"
		>
			<TextareaAutosize
				onChange={handleChange}
				onKeyPress={handleKeyPress}
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
