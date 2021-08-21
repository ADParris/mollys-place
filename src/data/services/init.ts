import firebase from 'firebase/app';

import { keys } from 'keys';

const firebaseConfig = {
	apiKey: keys.GOOGLE_API_KEY,
	authDomain: 'mollys-place.firebaseapp.com',
	projectId: 'mollys-place',
	storageBucket: 'mollys-place.appspot.com',
	messagingSenderId: '994149122484',
	appId: '1:994149122484:web:9b299c29fdf26e19a132e1',
	measurementId: 'G-BRZ7SJKMT0',
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export { firebase };
