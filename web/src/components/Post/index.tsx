import React from 'react';
import { iPost } from '../../types/post';
import { Container } from '../../layout/Body/Columns/Container';
import { PostBody } from './Body';
import { PostFooter } from './Footer';
import { PostHeader } from './Header';

export const Post: React.FC<iPost> = post => {
	const { content, createdAt, creator, id } = post;

	// Component state...
	const [isEditing, setIsEditing] = React.useState(false);

	return (
		<Container>
			<PostHeader
				createdAt={createdAt as string}
				creator={creator}
				image={content.image}
				id={id}
				setIsEditing={setIsEditing}
			/>
			<PostBody isEditing={isEditing} post={post} setIsEditing={setIsEditing} />
			<PostFooter />
		</Container>
	);
};
