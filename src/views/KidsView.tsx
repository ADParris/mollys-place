import React from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { selectUser } from 'data/store';

import { IViewProps, Sizes } from 'data/constants';
import { PostFilterTypes } from 'data/models';
import { setSize } from 'utils/helpers';

import {
	SiteMenu,
	BannerImage,
	Overlay,
	Feed,
	ProtectedRoute,
} from 'components';

export const KidsView: React.FC<IViewProps> = ({ banner, id }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const { current: currentUser } = useSelector(selectUser);

	return (
		<>
			{isLargeScreen && <SiteMenu isLargeScreen />}
			<Flex
				alignItems="center"
				as="section"
				borderLeft={isLargeScreen ? '0.1rem solid' : 'none'}
				flex={3.5}
				flexDir="column"
				mx={setSize(Sizes.gap)}
				pl={isLargeScreen ? setSize(Sizes.gap) : 0}
			>
				{banner.data && (
					<BannerImage {...banner} id={id} overlay={Overlay.light} />
				)}
				{!!currentUser ? (
					<Feed filter={PostFilterTypes.KIDS} />
				) : (
					<ProtectedRoute />
				)}
			</Flex>
		</>
	);
};
