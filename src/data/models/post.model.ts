import { IUser } from './user.model';

export interface IPostImageDimensions {
	height: number;
	width: number;
}

interface IPostImage {
	data: string;
	dimensions?: IPostImageDimensions;
	name: string;
}

export interface IPostRecipe {
	description: string;
	directions: string;
	image: IPostImage;
	ingredients: string[];
	name: string;
}

interface IPostVideo {
	id: string;
	image: string;
	title: string;
}

interface IPostContent {
	image?: IPostImage;
	recipe?: IPostRecipe;
	text?: string;
	video?: IPostVideo;
}

export interface IPostReply {
	content: string;
	createdAt: number;
	creator: IUser;
	id?: string;
	updatedAt?: number;
}

export type PostReplies = {
	[id: string]: IPostReply;
};

export interface IPostComment {
	content: string;
	createdAt: number;
	creator: IUser;
	id?: string;
	replies?: PostReplies;
	updatedAt?: number;
}

export type PostComments = {
	[id: string]: IPostComment;
};

export enum PostFilterTypes {
	GAMING = `gaming`,
	GENERAL = `general`,
	KIDS = `kids`,
	RECIPE = `recipe`,

	PUBLIC = `public`,
	USER = `user`,
}

type PostFilters = Partial<Record<PostFilterTypes, boolean>>;

export interface IPost {
	background?: string;
	comments?: PostComments;
	content: IPostContent;
	createdAt: number;
	creator: IUser;
	filters: PostFilters;
	id?: string;
	updatedAt?: number;
}
