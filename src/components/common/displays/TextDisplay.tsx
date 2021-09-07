import React from 'react';

import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';

import { Sizes } from 'data/constants';
import { IPost } from 'data/models';
import { setSize } from 'utils/helpers';

import { Text } from 'components';

interface IComponentProps {
	background: IPost['background'];
	text: IPost['content']['text'];
}

export const TextDisplay: React.FC<IComponentProps> = ({
	background,
	text,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	let adjustedText = '';
	const words = text!.split(' ');
	const isLong = words.length > 60;

	if (isLong) {
		adjustedText = words.slice(0, 59).join(' ');
	}

	const fontSize =
		background && !isLong
			? '1.75rem'
			: background && isLong
			? '1.25rem'
			: 'inherit';

	const displayLongText = (text: string) => (
		<>
			{text}
			<IconButton
				aria-label="read more"
				h={setSize(1.333)}
				icon={
					<Icon
						as={FiMoreHorizontal}
						h={setSize(1.111)}
						w={setSize(1.111)}
					/>
				}
				minW="auto"
				ml="0.15rem"
				mt="0.25rem"
				onClick={() => setShowAll(true)}
				w={setSize(1.333)}
				variant="ghost"
			/>
		</>
	);

	return (
		<Flex
			alignItems={background ? 'center' : 'initial'}
			bgColor={background ? background : 'inherit'}
			justifyContent={background ? 'center' : 'initial'}
			minH={background ? setSize(19.444) : 'initial'}
			p={setSize(Sizes.gap / 2)}
		>
			<Text
				color={background ? 'whiteAlpha.900' : 'inherit'}
				fontSize={fontSize}
				lineHeight={1.3}
			>
				{adjustedText && !showAll ? displayLongText(adjustedText) : text}
			</Text>
		</Flex>
	);
};
