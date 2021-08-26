import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Colors, Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';

import { AddPostModal } from './Modal';

interface IComponentProps {}

export const AddPostButton: React.FC<IComponentProps> = () => {
	const [selected, setSelected] = React.useState(``);

	const types = [`image`, `recipe`, `text`, `video`];

	const toggleSelected = (value: string) =>
		setSelected(selected ? `` : value);

	return (
		<Menu>
			<MenuButton
				_active={{ bgGradient: Colors.gradient }}
				_hover={{ bgGradient: Colors.gradient }}
				as={IconButton}
				aria-label="add post"
				bgGradient={Colors.gradient}
				borderRadius="50%"
				bottom={3}
				icon={<Icon as={FiPlus} color={Colors.dark.primaryTextColor} />}
				position="fixed"
				right={3}
				zIndex={1}
			/>
			<MenuList p={setSize(Sizes.gap)}>
				{types.map(type => (
					<ListItem key={type} handleClick={toggleSelected} type={type} />
				))}
			</MenuList>
			<AddPostModal selected={selected} toggleSelected={toggleSelected} />
		</Menu>
	);
};

interface IListItem {
	handleClick: (value: string) => void;
	type: string;
}

const ListItem: React.FC<IListItem> = ({ handleClick, type }) => (
	<MenuItem onClick={() => handleClick(type)} textTransform="capitalize">
		{`add ${type} post`}
	</MenuItem>
);
