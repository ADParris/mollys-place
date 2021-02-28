import Resizer from 'react-image-file-resizer';

export default class Utils {
	capitalize: (word: string) => string;

	resizeImage: (
		image: File
	) => Promise<string | File | Blob | ProgressEvent<FileReader>>;

	constructor() {
		this.capitalize = word =>
			word[0].toUpperCase() + word.substring(1).toLowerCase();

		this.resizeImage = image =>
			new Promise(resolve => {
				Resizer.imageFileResizer(
					image,
					700,
					700,
					'JPEG',
					80,
					0,
					uri => {
						resolve(uri);
					},
					'file'
				);
			});
	}
}
