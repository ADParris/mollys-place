import { Flex } from '@chakra-ui/react';
import React from 'react';
import { sizes } from '../../theme/sizes';
import { LeftColumn } from './Columns/Left';
import { RightColumn } from './Columns/Right';

interface ComponentProps {
	layout?: string;
}

export const Body: React.FC<ComponentProps> = ({ layout = 'main' }) => {
	const twoColumnLayout = (
		<Flex justify="center" minH={sizes.heights.body}>
			<Flex grow={1} maxW={sizes.widths.site}>
				<Flex grow={1} maxW={sizes.widths.rows.left}>
					<LeftColumn />
				</Flex>
				<Flex grow={1} maxW={sizes.widths.rows.right} ml={sizes.gap.outer}>
					<RightColumn />
				</Flex>
			</Flex>
		</Flex>
	);

	// Recieving layout allows for the possibility of different layouts...
	const selectedLayout = layout === 'main' ? twoColumnLayout : null;

	return selectedLayout;
};
