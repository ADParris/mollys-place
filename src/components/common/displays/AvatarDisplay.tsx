import React from 'react';

import { Avatar } from '@chakra-ui/react';

import { Sizes } from 'data/constants';
import { IUser } from 'data/models';
import { setSize } from 'utils/helpers';

interface IComponentProps {
	user: IUser;
}

export const AvatarDisplay: React.FC<IComponentProps> = ({ user }) => (
	<Avatar
		border="0.1rem solid white"
		name={user.name}
		h={setSize(2.222)}
		mr={setSize(Sizes.gap / 2)}
		src={user.image}
		w={setSize(2.222)}
	/>
);
