import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { auth } from '../../api/firebase';
import { Home } from '../../pages/Home';
import SystemActions from '../../redux/system/actions';
import SystemSelectors from '../../redux/system/selectors';
import { theme } from '../../theme';
import { fonts } from '../../theme/fonts';

export const App = () => {
	const { selectCurrentUser } = new SystemSelectors();
	const { setCurrentUser } = new SystemActions();
	const dispatch = useDispatch();

	// Redux store...
	const user = useSelector(selectCurrentUser);

	React.useEffect(() => {
		(async () => {
			const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
				userAuth && !user && dispatch(setCurrentUser(userAuth));
			});
			return () => unsubscribeFromAuth();
		})();
	}, [dispatch, setCurrentUser, user]);

	return (
		<ChakraProvider theme={theme}>
			<Global styles={fonts} />
			<Switch>
				<Route path="/" component={Home} />
			</Switch>
		</ChakraProvider>
	);
};
