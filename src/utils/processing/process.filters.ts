import { omit } from 'lodash';

import { IPost, PostFilterTypes } from 'data/models';

interface IPreparePostFilters {
	filters: IPost['filters'];
	selected: PostFilterTypes;
}

export const processFilters = ({
	filters,
	selected,
}: IPreparePostFilters) => {
	const privatePost = selected === PostFilterTypes.USER;
	switch (selected) {
		case PostFilterTypes.GAMING:
			return {
				gaming: true,
				general: true,
				...(!privatePost && { public: true }),
				user: true,
			};

		case PostFilterTypes.GENERAL:
			return {
				general: true,
				...(!privatePost && { public: true }),
				user: true,
			};
		case PostFilterTypes.KIDS:
			return {
				general: true,
				kids: true,
				user: true,
			};
		case PostFilterTypes.RECIPE:
			return {
				general: true,
				...(!privatePost && { public: true }),
				recipe: true,
				user: true,
			};
		default:
			return omit(filters, PostFilterTypes.PUBLIC);
	}
};
