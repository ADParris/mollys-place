import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComposerActions from '../../../../redux/composer/actions';
import ComposerSelectors from '../../../../redux/composer/selectors';
import { colors as systemColors } from '../../../../theme/colors';
import BackgroundsIcon from './assets/backgrounds.png';
import { colors } from './assets/colors';
import { BackgroundsButton as Button } from './Button';

export const Backgrounds: React.FC = () => {
	const { setBackground } = new ComposerActions();
	const { selectComposerIsActive } = new ComposerSelectors();
	const dispatch = useDispatch();

	// Redux store...
	const isActive = useSelector(selectComposerIsActive);

	// Component state...
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleIsOpen = () => setIsOpen(prevState => !prevState);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const color = event.currentTarget.dataset.color;
		color && dispatch(setBackground(color));
	};

	isOpen && !isActive && setIsOpen(false);

	const handleReset = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => dispatch(setBackground(undefined));

	const backgroundsList = () => {
		let colorList = [];

		const resetButton = (
			<Button
				handleClick={handleReset}
				key={systemColors.default.background}
				color={systemColors.default.background}
			>
				<Box
					bg={systemColors.default.background}
					borderRadius="0.375rem"
					d="inline-block"
					h="1.6rem"
					w="1.6rem"
				/>
			</Button>
		);

		colorList.push(resetButton);

		return (colorList = [
			...colorList,
			colors.map(color => (
				<Button color={color} key={color} handleClick={handleClick}>
					<Box
						bg={color}
						borderRadius="0.375rem"
						d="inline-block"
						h="1.6rem"
						w="1.6rem"
					/>
				</Button>
			)),
		]);
	};

	return (
		<Box mt={4}>
			<Flex align="center">
				<Button handleClick={toggleIsOpen}>
					<Image d="inline-block" h="1.8rem" src={BackgroundsIcon} />
				</Button>
				{isOpen && backgroundsList()}
			</Flex>
		</Box>
	);
};
