import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme/colors';
import { sizes } from '../../theme/sizes';
import { iPost } from '../../types/post';
import { CustomButtonOrLink } from '../CustomButtonOrLink';

interface iComponentProps {
	hasBackground: boolean;
	hasMedia: boolean;
	text: iPost['content']['text'];
}

export const TextDisplay: React.FC<iComponentProps> = ({
	hasBackground,
	hasMedia,
	text,
}) => {
	const [showAll, setShowAll] = React.useState(false);

	// Component variables...
	const textColor = hasBackground
		? colors.default.text.light
		: colors.default.text.dark;

	const textSize =
		hasBackground && text && text.length < 80 ? '2rem' : '1.25rem';

	const textWeight = hasBackground ? 'bold' : 'inherit';

	const toggleShowAll = () => setShowAll(prevState => !prevState);

	// If word count exceeds 64 words use read more...
	const textExcerpt = React.useRef<string | undefined>(undefined);
	const wordCount = React.useRef(0);
	const words = text && text.split(' ');
	React.useEffect(() => {
		if (words) {
			wordCount.current = words.length;
			if (!showAll && wordCount.current < 40) {
				setShowAll(true);
			} else if (!showAll && wordCount.current > 40) {
				textExcerpt.current = words.slice(0, 40).join(' ') + '...';
			}
		}
	}, [showAll, words]);

	return (
		<Flex
			align={hasBackground ? 'center' : 'initial'}
			flex={1}
			justify={hasBackground ? 'center' : 'initial'}
			p={sizes.gap.inner}
		>
			{text && (
				<Text
					color={textColor}
					fontSize={textSize}
					fontWeight={textWeight}
					mb={hasMedia ? sizes.gap.inner : 0}
				>
					{showAll ? text : textExcerpt.current}
					{wordCount.current > 40 && (
						<CustomButtonOrLink
							handleClick={toggleShowAll}
							text={showAll ? 'show less' : 'show more'}
						></CustomButtonOrLink>
					)}
				</Text>
			)}
		</Flex>
	);
};
