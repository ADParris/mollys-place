import React from 'react';
import { Button } from '@chakra-ui/react';

interface ComponentProps {
	color?: string;
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const BackgroundsButton: React.FC<ComponentProps> = ({
	color,
	children,
	handleClick,
}) => (
	<Button
		d="inline-block"
		data-color={color}
		h="2rem"
		lineHeight={0}
		minW={0}
		mr="0.375rem"
		onClick={handleClick}
		pl={0}
		pr={0}
		variant="unstyled"
		w="2rem"
	>
		{children}
	</Button>
);
