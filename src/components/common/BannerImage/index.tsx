import {
	Button,
	Divider,
	Flex,
	Image,
	useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateBanners } from 'data/store';

import { Sizes } from 'data/constants';
import { setSize } from 'utils/helpers';
import { IBanner } from 'data/models';

import { Text } from 'components';
import { ChangeImage } from './ChangeImage';

interface IComponentProps {
	alt: IBanner['alt'];
	data: IBanner['data'];
	dimensions: IBanner['dimensions'];
	id: string;
	overlay?: Overlay;
}

export enum Overlay {
	light = `blackAlpha.300`,
	medium = `blackAlpha.500`,
	dark = `blackAlpha.700`,
}

export const BannerImage: React.FC<IComponentProps> = ({
	alt,
	children,
	data,
	dimensions: { height, width },
	id,
	overlay,
}) => {
	const [isLargeScreen] = useMediaQuery(
		`(min-width: ${Sizes.breakPoint}px)`
	);

	const isAbout = id === `about`;

	const [preview, setPreview] = React.useState<IBanner | {}>({});

	const { current: currentUser } = useSelector(selectUser);
	const dispatch = useDispatch();

	const isAdmin = currentUser?.role === `admin`;

	if (!isLargeScreen) {
		height = height / 1.5;
		width = width / 1.5;
	}

	if ((preview as IBanner).data) {
		const newImage = preview as IBanner;
		alt = newImage.alt;
		data = newImage.data;
		height = newImage.dimensions.height;
		width = newImage.dimensions.width;
	}

	const handleCancel = () => setPreview({});

	const handleSubmit = () => {
		dispatch(updateBanners({ banner: preview, id }));
		setPreview({});
	};

	return (
		<Flex
			alignItems="center"
			borderRadius={setSize(Sizes.borderRadius)}
			h={isAbout ? 'full' : '30vh'}
			justifyContent="center"
			mb={isAbout ? 0 : setSize(Sizes.gap)}
			mx={isLargeScreen ? 0 : setSize(Sizes.gap)}
			overflow="hidden"
			position="relative"
			w="full"
		>
			<Image
				alt={alt}
				fit="cover"
				h={height}
				maxH={isAbout ? setSize(18) : height}
				maxW={isAbout ? setSize(18) : width}
				src={data}
				w={width}
			/>
			{overlay && (
				<Flex
					bgColor={overlay}
					h="full"
					left={0}
					position="absolute"
					top={0}
					w="full"
				/>
			)}
			{children && (
				<Flex
					bgColor={overlay}
					h="full"
					left={0}
					position="absolute"
					top={0}
					w="full"
				>
					{children}
				</Flex>
			)}
			{(preview as IBanner).data ? (
				<Flex
					bottom={0}
					justifyContent="center"
					left={0}
					position="absolute"
					w="full"
				>
					<Flex alignItems="center" flexDir="column" w="full">
						<Text>Use this image?</Text>
						<Flex mt={setSize(Sizes.gap)}>
							<Button onClick={handleSubmit} variant="link">
								Yes
							</Button>
							<Divider
								mx={setSize(Sizes.gap / 2)}
								orientation="vertical"
							/>
							<Button onClick={handleCancel} variant="link">
								No
							</Button>
						</Flex>
					</Flex>
				</Flex>
			) : (
				<>{isAdmin && <ChangeImage setPreview={setPreview} />}</>
			)}
		</Flex>
	);
};
