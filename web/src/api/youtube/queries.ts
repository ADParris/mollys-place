import { iPost } from '../../types/post';
import youtubeApi from './config';

export default class Queries {
	retrieveVideoDetails: (
		vid: string
	) => Promise<Partial<iPost['content']['video']>>;

	constructor() {
		this.retrieveVideoDetails = async vid => {
			const { data } = await youtubeApi.get('videos', { params: { id: vid } });
			const snippet = data['items'][0]['snippet'];
			return {
				image: snippet.thumbnails.standard.url,
				title: snippet.title,
			};
		};
	}
}
