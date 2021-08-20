import { extendTheme } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

import { Colors } from './colors';
import { Sizes } from './sizes';

const breakPoint = `@media only screen and (min-width: ${Sizes.breakPoint}px)`;

export const customTheme = extendTheme({
	components: {
		Button: {
			baseStyle: {
				_focus: {
					boxShadow: `0 0 0 0.1rem rgb(255 255 255 / 90%)`,
				},
			},
			variants: {
				ghost: props => ({
					...theme.components.Button.variants.ghost(props),
					_hover: {
						bg: mode(
							Colors.light.surfaceColor,
							Colors.dark.surfaceColor
						)(props),
					},
				}),
				outline: props => ({
					...theme.components.Button.variants.outline(props),
					_hover: {
						bg: `whiteAlpha.200`,
					},
				}),
				solid: props => ({
					...theme.components.Button.variants.solid(props),
					_hover: {
						bg: `blue.400`,
					},
					bg: 'blue.600',
				}),
			},
		},
		Link: {
			baseStyle: {
				_focus: {
					boxShadow: 'none',
				},
				_hover: {
					textDecoration: 'none',
				},
				color: 'blue.600',
			},
			defaultProps: {
				variant: 'primary',
			},
			variants: {
				primary: ({ colorScheme = 'blue' }) => ({
					color: `${colorScheme}.600`,
					_hover: {
						color: `${colorScheme}.400`,
					},
				}),
			},
		},
		Text: {
			baseStyle: {
				fontWeight: 'light',
				letterSpacing: 'wide',
			},
		},
	},
	config: {
		useSystemColorMode: true,
	},
	styles: {
		global: props => ({
			':root': {
				'--defaultFontSize': '87.5%',
			},
			body: {
				bg: mode(Colors.light.bgColor, Colors.dark.bgColor)(props),
				color: mode(
					Colors.light.primaryTextColor,
					Colors.dark.primaryTextColor
				)(props),
				fontFamily: '"Open Sans", sans-serif',
			},
			html: {
				fontSize: 'var(--defaultFontSize)',
				[breakPoint]: {
					':root': {
						'--defaultFontSize': '100%',
					},
				},
				'@media only screen and (min-width: 1024px)': {
					':root': {
						'--defaultFontSize': '112.5%',
					},
				},
			},
		}),
	},
});
