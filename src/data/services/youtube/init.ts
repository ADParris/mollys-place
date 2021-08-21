import axios from 'axios';
import { keys } from 'keys';

export const youtubeApi = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		key: keys.GOOGLE_API_KEY,
		type: 'video',
		part: 'snippet',
	},
});
