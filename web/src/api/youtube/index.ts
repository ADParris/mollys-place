import { iPost } from '../../types/post';
import Queries from './queries';

export default class Youtube {
	_queries = new Queries();

	processVideo: (link: string) => Promise<iPost['content']['video']>;

	constructor() {
		this.processVideo = async link => {
			const vid =
				link && link.includes('youtu.be')
					? link.substr(link.lastIndexOf('/') + 1)
					: link.split(/=(.+)/)[1].split('&')[0];

			const resp = await this._queries.retrieveVideoDetails(vid);

			return {
				...resp,
				id: vid,
				source: 'youtube',
			} as iPost['content']['video'];
		};
	}
}
