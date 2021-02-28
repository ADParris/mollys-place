import { Image } from '@chakra-ui/react';
import React from 'react';
import { sizes } from '../../theme/sizes';
import { iPost } from '../../types/post';

// Content boolean prevents main feed images from expanding...
interface ComponentProps {
	content?: boolean;
	image: iPost['content']['image'];
}

export const ImageDisplay: React.FC<ComponentProps> = ({ content, image }) => {
	const [imageWidth, setImageWidth] = React.useState(0);

	const imgElement = React.useRef(null);

	const getImageWidth = (imgElement: React.RefObject<HTMLImageElement>) => {
		if (imgElement && imgElement.current && imgElement.current.naturalWidth) {
			setImageWidth(imgElement.current.naturalWidth);
		}
	};

	return (
		<>
			{image && (
				<Image
					alt={image.name}
					fit={
						imageWidth < sizes.widths.content && content ? 'none' : 'initial'
					}
					onLoad={() => getImageWidth(imgElement)}
					ref={imgElement}
					src={image.link}
				/>
			)}
		</>
	);
};
