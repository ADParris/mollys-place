import { ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { auth, signInWithGoogle } from '../../api/firebase';
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher';
import { CustomButtonOrLink } from '../../components/CustomButtonOrLink';
import SystemSelectors from '../../redux/system/selectors';

export const Menu: React.FC = () => {
	const { selectCurrentUser } = new SystemSelectors();

	// Redux store...
	const user = useSelector(selectCurrentUser);

	const handleSignin = () => signInWithGoogle();

	const handleSignout = () => auth.signOut();

	const loginMenuItem = user ? (
		<ButtonGroup align="center" justify="flex-end" spacing={2}>
			<CustomButtonOrLink background user={user} />
			<CustomButtonOrLink
				background
				handleClick={handleSignout}
				text="Signout"
			/>
		</ButtonGroup>
	) : (
		<CustomButtonOrLink background handleClick={handleSignin} text="Signin" />
	);

	return (
		<ButtonGroup spacing={2}>
			{loginMenuItem}
			<ColorModeSwitcher />
		</ButtonGroup>
	);
};
