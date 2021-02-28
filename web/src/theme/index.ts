import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';
import { ChakraTheme } from '@chakra-ui/theme';

const config = {
	useSystemColorMode: true,
};

const styles: Styles = {
	global: props => ({
		body: {
			bg: mode('whiteAlpha.900', '#1A202C')(props),
		},
	}),
};

export const theme: ChakraTheme = extendTheme({ config, styles });
