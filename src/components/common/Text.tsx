import { Text as T, TextProps } from '@chakra-ui/react';
import React from 'react';

export const Text: React.FC<TextProps> = ({ children, ...textProps }) => {
	const fontSize =
		textProps.as === 'h1'
			? '2em'
			: textProps.as === 'h2'
			? '1.5em'
			: textProps.as === 'h3'
			? '1.17em'
			: textProps.as === 'h4'
			? 'initial'
			: textProps.as === 'h5'
			? '0.83em'
			: textProps.as === 'h6'
			? '0.67em'
			: 'inherit';

	const fontWeight =
		textProps.as === 'h1' ||
		textProps.as === 'h2' ||
		textProps.as === 'h3' ||
		textProps.as === 'h4' ||
		textProps.as === 'h5' ||
		textProps.as === 'h6'
			? 'bold'
			: 'inherit';

	return (
		<T fontSize={fontSize} fontWeight={fontWeight} {...textProps}>
			{children}
		</T>
	);
};
