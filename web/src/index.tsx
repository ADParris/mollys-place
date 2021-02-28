import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ColorModeScript />
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
