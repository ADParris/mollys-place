import firebase from 'firebase';

import { IPost, PostFilterTypes } from 'data/models';

import { db } from '../init';

export interface IPostsResponse {
	failure?: string;
	success?: {
		cursor: number | null;
		isEnd: boolean;
		posts: IPost[];
	};
}

const collectionRef = db.collection('posts');

export interface IRetrievePosts {
	cursor: number | null;
	filter: PostFilterTypes | null;
	isAuthed: boolean;
}

export const retrievePosts = async ({
	cursor,
	filter,
	isAuthed,
}: IRetrievePosts) => {
	let isEnd = false;
	const numberToRetrieve = 6;
	const response = {} as IPostsResponse;
	const posts: IPost[] = [];

	console.log(`isAuthed: ${isAuthed}`);
	console.log(`Filter: ${filter}`);

	const authFilter = isAuthed
		? `filters.${PostFilterTypes.USER}`
		: `filters.${PostFilterTypes.PUBLIC}`;

	const catFilter = `filters.${filter}`;

	// Construct query...
	let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
	if (cursor) {
		console.log(`Cursor: ${cursor}`);
		query = collectionRef.where(authFilter, `==`, true);
		query = filter ? query.where(catFilter, `==`, true) : query;
		query = query.orderBy('createdAt', 'desc');
		query = query.startAfter(cursor);
	} else {
		query = collectionRef.where(authFilter, `==`, true);
		query = filter ? query.where(catFilter, `==`, true) : query;
		query = query.orderBy('createdAt', 'desc');
	}

	query = query.limit(numberToRetrieve);

	try {
		const snapshot = await query.get();

		console.log(`Returned: ${snapshot.docs.length}`);

		isEnd = snapshot.docs.length < numberToRetrieve;
		const cursor = isEnd
			? null
			: (snapshot.docs[snapshot.docs.length - 1].data()
					.createdAt as IPost['createdAt']);

		snapshot.forEach(doc =>
			posts.push({ id: doc.id, ...doc.data() } as IPost)
		);

		response.success = { cursor, isEnd, posts };
	} catch (error) {
		response.failure = error.message;
	}
	return response;
};
