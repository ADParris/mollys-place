import { extendTheme } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

import { Colors } from './constant.colors';
import { Sizes } from './constant.sizes';
import { setSize } from 'utils/helpers';

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
				link: props => ({
					...theme.components.Button.variants.link(props),
					color: `whiteAlpha.700`,
					_hover: {
						color: `whiteAlpha.900`,
						textDecoration: 'none',
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
				// color: 'blue.600',
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
	styles: {
		global: props => ({
			':root': {
				'--defaultFontSize': '100%',
			},
			body: {
				'&::-webkit-scrollbar': {
					width: setSize(0.4),
				},
				'&::-webkit-scrollbar-thumb': {
					bgColor: `purple.600`,
					borderRadius: setSize(Sizes.borderRadius),
				},
				bgColor: mode(Colors.light.bgColor, Colors.dark.bgColor)(props),
				color: mode(
					Colors.light.primaryTextColor,
					Colors.dark.primaryTextColor
				)(props),
				fontFamily:
					'Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif',
			},
			html: {
				fontSize: 'var(--defaultFontSize)',
				[breakPoint]: {
					':root': {
						'--defaultFontSize': '112.5%',
					},
				},
				'@media only screen and (min-width: 1024px)': {
					':root': {
						'--defaultFontSize': '125%',
					},
				},
			},
		}),
	},
});
