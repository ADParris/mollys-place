import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { customTheme, IRoute, routes, store } from 'data';
import { Layout } from 'components';

export const App: React.FC = () => {
	// Temporary...
	const isAuthed = false;

	const setPath = (id: IRoute['id']) => (id === `home` ? `/` : `/${id}`);

	return (
		<ChakraProvider resetCSS theme={customTheme}>
			<Provider store={store}>
				<Layout>
					<Switch>
						{routes.map(route => (
							<Route key={route.id} path={setPath(route.id)}>
								{isAuthed && route.id === `signIn` ? (
									<Redirect to="/" />
								) : (
									<route.Component id={route.id} />
								)}
							</Route>
						))}
					</Switch>
				</Layout>
			</Provider>
		</ChakraProvider>
	);
};
