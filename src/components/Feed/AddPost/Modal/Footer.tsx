import React from 'react';

import { Button, Flex, Input, Select } from '@chakra-ui/react';

import { Colors, Sizes } from 'data/constants';
import { PostFilterTypes } from 'data/models';
import { setSize } from 'utils/helpers';
import { usePost } from 'utils/hooks';

import { Text } from 'components';

interface IComponentProps {
	onClose: () => void;
}

export const ModalFooter: React.FC<IComponentProps> = ({ onClose }) => {
	const {
		filters,
		handleFilterSelect,
		handleKeyPress,
		handleSubmission,
		handleSubmit,
		isComposingImage,
		isComposingVideo,
		submission,
	} = usePost();
	const openImageSelectRef = React.useRef<HTMLInputElement>(null);

	const currentCategory = filters.gaming
		? PostFilterTypes.GAMING
		: filters.kids
		? PostFilterTypes.KIDS
		: filters.recipe
		? PostFilterTypes.RECIPE
		: PostFilterTypes.GENERAL;

	const currentVisibility = filters.public
		? PostFilterTypes.PUBLIC
		: PostFilterTypes.USER;

	const handlePostSubmit = () => {
		handleSubmit();
		onClose();
	};

	React.useEffect(() => {
		isComposingImage &&
			!submission &&
			openImageSelectRef.current &&
			openImageSelectRef.current.click();
	}, [isComposingImage, submission]);

	return (
		<Flex
			borderBottomRadius={setSize(Sizes.borderRadius)}
			bgGradient={Colors.gradient}
			color="whiteAlpha.900"
			flexDir="column"
			minH={setSize(3.333)}
			p={setSize(Sizes.gap / 2)}
			w="full"
		>
			{isComposingVideo && (
				<Flex flexDir="column">
					<Text>Enter the YouTube video link...</Text>
					<Input
						accept="image/*"
						bg="white"
						color={Colors.light.primaryTextColor}
						mb={setSize(Sizes.gap)}
						onChange={handleSubmission}
						onKeyPress={handleKeyPress}
						value={submission}
					/>
				</Flex>
			)}
			<Input
				display="none"
				onChange={handleSubmission}
				ref={openImageSelectRef}
				type="file"
				zIndex={50}
			/>
			<Flex flex={1} justifyContent="space-between">
				<Flex>
					<Select
						disabled={filters.kids}
						mr={setSize(Sizes.gap / 2)}
						onChange={handleFilterSelect}
						value={currentVisibility}
						w="fit-content"
					>
						<option value={PostFilterTypes.PUBLIC}>Public</option>
						<option value={PostFilterTypes.USER}>User</option>
					</Select>
					<Select
						onChange={handleFilterSelect}
						value={currentCategory}
						w="fit-content"
					>
						<option value={PostFilterTypes.GENERAL}>General</option>
						<option value={PostFilterTypes.GAMING}>Gaming</option>
						<option value={PostFilterTypes.KIDS}>Grandkids</option>
						<option value={PostFilterTypes.RECIPE}>Recipe</option>
					</Select>
				</Flex>
				<Button
					letterSpacing="wider"
					onClick={handlePostSubmit}
					variant="outline"
				>
					POST
				</Button>
			</Flex>
		</Flex>
	);
};
