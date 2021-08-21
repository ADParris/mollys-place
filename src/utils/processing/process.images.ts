import Resizer from 'react-image-file-resizer';

import { IBanner, IPostImageDimensions, IPostRecipe } from 'data/models';

interface IProcessImageResponse {
	failure: string;
	success: IBanner | IPostRecipe;
}

const getImageDimensions = (image: File) =>
	new Promise(resolve => {
		const imageUrl = URL.createObjectURL(image);
		const img = new Image();
		img.onload = () => {
			resolve({
				height: img.height,
				width: img.width,
			});
			URL.revokeObjectURL(img.src);
		};
		img.src = imageUrl;
	});

const resizeImage = (image: File) =>
	new Promise(resolve => {
		Resizer.imageFileResizer(
			image,
			700,
			700,
			'WEBP',
			90,
			0,
			uri => {
				resolve(uri as File);
			},
			'file'
		);
	}) as Promise<File>;

const readFileAsync = async (image: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject;

		reader.readAsDataURL(image);
	});

export const processImage = async (image: File) => {
	const response = {} as IProcessImageResponse;
	try {
		const resizedImage = await resizeImage(image);

		const imageData = (await readFileAsync(resizedImage)) as string;

		const imageDimensions = (await getImageDimensions(
			resizedImage
		)) as IPostImageDimensions;

		response.success = {
			alt: resizedImage.name.toLowerCase().split(/\.(?=[^]+$)/g)[0],
			data: imageData,
			dimensions: imageDimensions,
		};
	} catch (error) {
		response.failure = error.message;
	}

	return response;
};
