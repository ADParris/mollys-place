import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { customTheme, IRoute, routes, Sizes } from 'data';

export const App: React.FC = () => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	// Temporary...
	const isAuthed = false;

	const setPath = (id: IRoute['id']) => (id === `home` ? `/` : `/${id}`);

	return (
		<ChakraProvider resetCSS theme={customTheme}>
			<Switch>
				{routes.map(route => (
					<Route key={route.id} path={setPath(route.id)}>
						{isAuthed && route.id === `signIn` ? (
							<Redirect to="/" />
						) : (
							<route.Component
								id={route.id}
								isLargeScreen={isLargeScreen}
							/>
						)}
					</Route>
				))}
			</Switch>
		</ChakraProvider>
	);
};
