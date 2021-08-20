interface IBannerDimensions {
	height: number;
	width: number;
}

export interface IBanner {
	alt: string;
	data: string;
	dimensions: IBannerDimensions;
}

export interface IBanners {
	[x: string]: IBanner;
}
