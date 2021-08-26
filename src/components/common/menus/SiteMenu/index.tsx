import React from 'react';

import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import { Colors, Sizes, Strings } from 'data/constants';
import { setSize } from 'utils/helpers';

import { viewsMenu } from 'data/constants';

import { Footer } from 'components';
import { MenuButton } from './MenuButton';

interface IComponentProps {
	isLargeScreen: boolean;
}

export const SiteMenu: React.FC<IComponentProps> = ({ isLargeScreen }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const {
		site: { initials },
	} = Strings;

	const _buildMenu = () =>
		viewsMenu.map(item => (
			<MenuButton
				handleClose={onClose}
				isOpen={isOpen}
				key={item.id}
				{...item}
			/>
		));

	return isLargeScreen ? (
		<Flex
			as="section"
			flex={1.5}
			flexDirection="column"
			h="fit-content"
			justifyContent="space-between"
			position="sticky"
			top={setSize(4.032)}
		>
			<Flex flexDirection="column" h="full">
				{_buildMenu()}
			</Flex>
		</Flex>
	) : (
		<Flex>
			<IconButton
				_hover={{ background: 'whiteAlpha.200' }}
				aria-label="site menu"
				bgColor="transparent"
				color="white"
				h={setSize(2)}
				id="site-menu-button"
				icon={<Icon as={FiMenu} />}
				minW="auto"
				onClick={onOpen}
				ref={btnRef}
				w={setSize(2)}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton size="sm" color={Colors.light} />
					<DrawerHeader p={0} mb={`${Sizes.gap}rem`}>
						<Flex
							alignItems="center"
							bgGradient={Colors.gradient}
							display="flex"
							h={`${10}rem`}
							justifyContent="center"
						>
							<Text
								fontFamily="Great Vibes"
								fontSize="6xl"
								fontWeight="normal"
								letterSpacing={8}
							>
								{initials}
							</Text>
						</Flex>
					</DrawerHeader>

					<DrawerBody>{_buildMenu()}</DrawerBody>

					<DrawerFooter
						justifyContent="center"
						py={setSize(Sizes.gap / 2)}
					>
						<Footer isLargeScreen={isLargeScreen} />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};
