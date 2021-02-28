import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { capitalize } from '../../helpers';
import { CustomButtonOrLink } from '../CustomButtonOrLink';

interface ComponentProps {
	action?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
	background?: boolean;
	type: string;
}

const SiteModal: React.FC<ComponentProps> = ({
	action,
	background,
	children,
	type,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const typeCapitalized = capitalize(type);

	const buttonText =
		type === 'image' || type === 'video' ? `Upload` : typeCapitalized;

	const title =
		type === 'image'
			? `Photo Upload`
			: type === 'video'
			? `Video Upload`
			: typeCapitalized;

	const handleAction = (
		event: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		action && action(event);
		onClose();
	};

	return (
		<>
			<CustomButtonOrLink
				background={background}
				handleClick={onOpen}
				text={typeCapitalized}
			/>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>

					<ModalFooter>
						{action && (
							<Button colorScheme="purple" mr={2} onClick={handleAction}>
								{buttonText}
							</Button>
						)}
						<Button variant="ghost" onClick={onClose}>
							{action ? `Cancel` : `Ok`}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SiteModal;
