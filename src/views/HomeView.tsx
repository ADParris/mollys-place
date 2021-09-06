import React from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { Helmet } from 'react-helmet-async';

import { IViewProps, Sizes, Strings } from 'data/constants';
import { PostFilterTypes } from 'data/models';
import { setSize } from 'utils/helpers';

import { BannerImage, Feed, Overlay, SiteMenu } from 'components';

export const HomeView: React.FC<IViewProps> = ({ banner, id }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const {
		site: { title },
	} = Strings;

	return (
		<>
			<Helmet>
				<title>{`${title} | ${capitalize(id)}`}</title>
			</Helmet>
			{isLargeScreen && <SiteMenu isLargeScreen />}
			<Flex
				alignItems="center"
				as="section"
				flex={3.5}
				flexDir="column"
				mx={setSize(Sizes.gap)}
			>
				{banner.data && (
					<BannerImage {...banner} id={id} overlay={Overlay.light} />
				)}
				<Feed filter={PostFilterTypes.GENERAL} />
			</Flex>
		</>
	);
};
