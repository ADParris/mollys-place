import React from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Colors, Strings } from 'data/constants';
import { setSize } from 'utils/helpers';
import { useColors } from 'utils/hooks';

interface IComponentProps {
	large?: boolean;
}

export const SiteLogo: React.FC<IComponentProps> = ({ large }) => {
	const {
		site: { title },
	} = Strings;

	const { primaryTextColor } = useColors();

	return (
		<Flex>
			<Link to="/">
				<Flex fontSize={large ? '2xl' : 'xl'}>
					<Text
						color={large ? Colors.dark.primaryTextColor : primaryTextColor}
						fontFamily="Great Vibes"
						lineHeight={1.2}
						mt={setSize(0.278)}
						pr={setSize(0.111)}
					>
						{title}
					</Text>
				</Flex>
			</Link>
		</Flex>
	);
};
