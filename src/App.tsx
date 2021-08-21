import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { customTheme, IRoute, routes } from 'data/constants';
import { auth } from 'data/services';
import {
	resetPostsSlice,
	selectBanners,
	selectUser,
	setBanners,
	setLoading,
	setUser,
} from 'data/store';

import { Layout, Loading } from 'components';
import { IBanners } from './data/models';

export const App: React.FC = () => {
	const {
		// error: bannerError,
		list: bannersList,
		loading: loadingBanners,
	} = useSelector(selectBanners);
	const {
		current: currentUser,
		// error: userError,
		loading: loadingUser,
	} = useSelector(selectUser);
	const dispatch = useDispatch();

	const loading = loadingBanners && loadingUser;

	const setPath = (id: IRoute['id']) => (id === `home` ? `/` : `/${id}`);

	React.useEffect(() => {
		const getBanners = () =>
			new Promise(resolve => {
				resolve(dispatch(setBanners()));
			});
		const getUser = () =>
			new Promise(resolve => {
				const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
					unsubscribe();
					resolve(firebaseUser);
				});
			});

		const init = async () => {
			await getBanners();
			const firebaseUser = (await getUser()) as firebase.User;

			if (firebaseUser) {
				dispatch(setUser(firebaseUser.uid));
			} else {
				dispatch(setLoading(false));
			}
			dispatch(resetPostsSlice());
		};

		init();
	}, [dispatch]);

	return (
		<ChakraProvider resetCSS theme={customTheme}>
			{loading ? (
				<Loading />
			) : (
				<Layout>
					<Switch>
						{routes.map(route => {
							const banner = (bannersList as IBanners)[route.id];
							return (
								<Route key={route.id} path={setPath(route.id)}>
									{currentUser && route.id === `signIn` ? (
										<Redirect to="/" />
									) : (
										<route.Component banner={banner} id={route.id} />
									)}
								</Route>
							);
						})}
					</Switch>
				</Layout>
			)}
		</ChakraProvider>
	);
};
