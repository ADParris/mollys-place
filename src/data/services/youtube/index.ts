import { IPost } from 'data/models';
import { youtubeApi } from './init';

interface IYoutubeApiResponse {
	failure: string;
	success: IPost['content'];
}

export const retrieveVideoInfo = async (link: string) => {
	const isYoutubeLink =
		link.includes('youtu.be') || link.includes('youtube.com');
	const response = {} as IYoutubeApiResponse;

	const vid =
		isYoutubeLink && link.includes('youtu.be')
			? link.substr(link.lastIndexOf('/') + 1)
			: isYoutubeLink && link.includes('youtube.com')
			? link.split(/=(.+)/)[1].split('&')[0]
			: 'invalid';

	try {
		if (vid === 'invalid') throw new Error('Invalid Link');

		const { data } = await youtubeApi.get('videos', {
			params: { id: vid },
		});

		const snippet = data['items'][0]['snippet'];

		const image = snippet.thumbnails.maxres
			? snippet.thumbnails.maxres.url
			: snippet.thumbnails.standard
			? snippet.thumbnails.standard.url
			: snippet.thumbnails.high.url;

		response.success = {
			video: {
				id: vid,
				image,
				title: snippet.title,
			},
		};
	} catch (error) {
		response.failure = error.message;
	}

	return response;
};
