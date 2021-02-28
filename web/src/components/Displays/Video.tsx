import { Flex, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme/colors';
import { iPost } from '../../types/post';

interface ComponentProps {
	video: iPost['content']['video'];
}

export const VideoDisplay: React.FC<ComponentProps> = ({ video }) => {
	let link: string = '';
	let source: string = '';
	if (video && video.source === 'youtube') {
		link = `https://www.youtube.com/watch?v=${video.id}`;
		source = 'YOUTUBE.COM';
	}

	return (
		<>
			{video && (
				<Link
					href={link}
					style={{ textDecoration: 'none' }}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Flex direction="column">
						<Image src={video.image} alt={video.title} />
						<Flex direction="column" p="2" pb="0" position="relative">
							<Text
								color={colors.default.text.faded}
								fontSize="sm"
								lineHeight="4"
							>
								{source}
							</Text>
							<Text
								as="h5"
								color={colors.default.text.dark}
								fontSize="lg"
								fontWeight="bold"
								mt={1}
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
							>
								{video.title}
							</Text>
						</Flex>
					</Flex>
				</Link>
			)}
		</>
	);
};
