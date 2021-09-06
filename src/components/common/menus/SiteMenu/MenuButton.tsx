import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { IViewsMenuItem, Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';
import { useColors } from 'utils/hooks';

import { Text } from '../../Text';

interface IComponentProps extends IViewsMenuItem {
	handleClose: () => void;
	isOpen: boolean;
}

export const MenuButton: React.FC<IComponentProps> = ({
	handleClose,
	icon,
	id,
	isOpen,
}) => {
	const { surfaceColor } = useColors();
	const history = useHistory();
	const path = id === `home` ? `/` : `/${id}`;
	const bgColor =
		history.location.pathname === path ? surfaceColor : `inherit`;

	const handleClick = () => {
		history.push(path);
		isOpen && handleClose();
	};

	return (
		<Button
			alignItems="center"
			bgColor={bgColor}
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
