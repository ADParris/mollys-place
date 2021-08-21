import React from 'react';

import { Box, Flex, Image, IconButton } from '@chakra-ui/react';

import { colors } from './assets/data/colors';
import icon from './assets/images/backgrounds.png';

interface IComponentProps {
	bg?: string;
	handleBgChange: (value: string) => void;
}

export const Backgrounds: React.FC<IComponentProps> = ({
	bg,
	handleBgChange,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Flex alignItems="center">
			<IconButton
				aria-label="background colors"
				h="2rem"
				icon={<Image h="1.75rem" src={icon} w="1.75rem" />}
				minW="auto"
				onClick={() => setIsOpen(!isOpen)}
				variant="outline"
				w="2rem"
			/>
			{isOpen && (
				<Flex as="ul">
					<Box
						as="span"
						bg="#ebedf0"
						border="transparent"
						borderRadius="0.3rem"
						h="1.5rem"
						mr="0.5rem"
						onClick={() => handleBgChange('')}
						w="1.5rem"
					/>
					{colors.map(color => {
						const isActive = bg === color;

						return (
							<Box
								as="span"
								bg={color}
								border={`0.1rem solid ${
									isActive ? 'white' : 'transparent'
								}`}
								borderRadius="0.3rem"
								h="1.5rem"
								key={color}
								mr="0.5rem"
								onClick={() => handleBgChange(color)}
								w="1.5rem"
							/>
						);
					})}
				</Flex>
			)}
		</Flex>
	);
};
