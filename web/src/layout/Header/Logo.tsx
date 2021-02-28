import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
	return (
		<Flex>
			<Link to="/">
				<Flex align="center">
					<Text fontFamily="Great Vibes" fontSize="3xl" lineHeight="shorter">
						Molly's Place
					</Text>
				</Flex>
			</Link>
		</Flex>
	);
};
