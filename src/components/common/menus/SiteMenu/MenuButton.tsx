import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';
import { IViewsMenuItem } from 'data/constants';

import { Text } from '../../Text';

export const MenuButton: React.FC<IViewsMenuItem> = ({ icon, id }) => {
	const history = useHistory();

	const handleClick = () => history.push(`/${id}`);

	return (
		<Button
			alignItems="center"
			h={setSize(2.222)}
			justifyContent="flex-start"
			leftIcon={<Icon as={icon} mr={`${Sizes.gap / 2}rem`} />}
			mb={`${Sizes.gap / 2}rem`}
			onClick={handleClick}
			variant="ghost"
			w="100%"
		>
			<Text
				fontWeight="light"
				letterSpacing="wide"
				textTransform="capitalize"
			>
				{id}
			</Text>
		</Button>
	);
};
