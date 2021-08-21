import React from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';

import { IViewProps, Sizes } from 'data/constants';
// import { PostFilterTypes } from 'data/models';
import { setSize } from 'utils/helpers';

import { SiteMenu, BannerImage, Overlay } from 'components';
export const GamingView: React.FC<IViewProps> = ({ banner, id }) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

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
				{/* <Feed filter={PostFilterTypes.GENERAL} /> */}
			</Flex>
		</>
	);
};
