import { iError } from './error';
import { iUser } from './user';

interface iPostComment {
	createdAt: number | string;
	creator: iPostCreator;
	id?: string;
	text: string;
	updatedAt?: number | string;
}

interface iPostComments {
	[id: string]: iPostComment;
}

interface iPostContent {
	image?: iPostImage;
	text?: string;
	video?: iPostVideo;
}

interface iPostCreator {
	id: string;
	image: string;
	name: string;
	profile: string;
}

interface iPostImage {
	link: string;
	name: string;
}

interface iPostVideo {
	id: string;
	image: string;
	source: string;
	title: string;
}

export interface iPost {
	background?: string;
	comments?: iPostComments;
	content: iPostContent;
	createdAt: number | string;
	creator: iPostCreator;
	id?: string;
	updatedAt?: number | string;
}

export interface iCreatingPostObj {
	background?: string;
	currentUser: iUser;
	content: iPost['content'];
}

export interface iFileDeleteResponse {
	success?: boolean;
	error?: iError;
}

export interface iFileUploadResponse {
	success?: iPost['content']['image'];
	error?: iError;
}

export interface iPostMutationResponse {
	success?: boolean | iPost;
	error?: iError;
}

export interface iPostQueryResponse {
	success?: iPost[];
	error?: iError;
}

export interface iSelectedState {
	type: 'image' | 'video';
	payload: iPost['content']['image'] | iPost['content']['video'];
}
