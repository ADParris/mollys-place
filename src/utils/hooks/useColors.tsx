import { useColorModeValue } from '@chakra-ui/color-mode';

import { Colors } from '../../data/constants';

export const useColors = () => {
	const bgColor = useColorModeValue(
		Colors.light.bgColor,
		Colors.dark.bgColor
	);
	const primaryTextColor = useColorModeValue(
		Colors.light.primaryTextColor,
		Colors.dark.primaryTextColor
	);
	const secondaryTextColor = useColorModeValue(
		Colors.light.secondaryTextColor,
		Colors.dark.secondaryTextColor
	);
	const surfaceColor = useColorModeValue(
		Colors.light.surfaceColor,
		Colors.dark.surfaceColor
	);

	return { bgColor, primaryTextColor, secondaryTextColor, surfaceColor };
};
