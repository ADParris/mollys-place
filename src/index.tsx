import React from 'react';

import { ColorModeScript } from '@chakra-ui/react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from 'data/store';

import { App } from 'App';

// import reportWebVitals from "./_cra-extras/reportWebVitals"
// import * as serviceWorker from "./_cra-extras/serviceWorker"

render(
	<React.StrictMode>
		<ColorModeScript />
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals()
