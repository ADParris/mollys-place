import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

import { useSelector } from 'react-redux';
import { selectEditing } from 'data/store/system';

import { Colors, Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';
import { usePost } from 'utils/hooks';

import { Backgrounds } from './Backgrounds';
import { Preview } from './Preview';

export interface IPostEditorProps {
	post?: IPost;
}

export const PostEditor: React.FC<IPostEditorProps> = ({ post }) => {
	const postToEdit =
		useSelector(selectEditing).post === post?.id ? post : undefined;

	const {
		background: bg,
		content,
		errMsg,
		handleBgChange,
		handleCancel,
		handleContentChange,
		handleSubmit,
		isEditing,
	} = usePost(postToEdit);

	const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
		e => handleContentChange({ text: e.target.value });

	return (
		<>
			<TextareaAutosize
				minRows={5}
				onChange={handleTextChange}
				style={{
					background: bg ? bg : 'white',
					color: bg ? 'white' : 'black',
					fontSize: bg ? '2rem' : 'initial',
					height: 200,
					outline: 'none',
					overflow: 'hidden',
				}}
				value={content?.text ? content.text : ''}
			/>
			{isEditing && (
				<Flex justifyContent="flex-end" p={setSize(Sizes.gap)}>
					<Button
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						onClick={handleSubmit}
						variant="link"
					>
						Update
					</Button>
					<Text
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						px={setSize(Sizes.gap / 2)}
					>
						·
					</Text>
					<Button
						color={bg ? 'inherit' : Colors.light.secondaryTextColor}
						onClick={handleCancel}
						variant="link"
					>
						Cancel
					</Button>
				</Flex>
			)}
			{content?.image || content?.video ? (
				<Preview content={content} />
			) : (
				<Backgrounds bg={bg} handleBgChange={handleBgChange} />
			)}
			{errMsg && (
				<Text color="red" my={setSize(Sizes.gap / 2)} textAlign="center">
					~ {errMsg} ~
				</Text>
			)}
		</>
	);
};
