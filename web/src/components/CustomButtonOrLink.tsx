import { Button, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { capitalize } from '../helpers';
import { iUser } from '../types/user';

interface ComponentProps {
	background?: boolean;
	button?: boolean;
	destination?: string;
	external?: boolean;
	handleClick?: () => void;
	image?: string;
	text?: string;
	type?: string;
	user?: iUser;
}

export const CustomButtonOrLink: React.FC<ComponentProps> = ({
	background = false,
	button = true,
	destination,
	external = false,
	handleClick,
	image,
	text,
	type,
	user,
}) => {
	const textColor = background
		? { normal: 'whiteAlpha.200', hovered: 'whiteAlpha.400' }
		: { normal: 'whiteAlpha.200', hovered: 'whiteAlpha.400' };

	const buttonOrLink = button ? (
		handleClick ? (
			type ? (
				<Button
					bg={textColor.normal}
					_hover={{ bg: textColor.hovered }}
					onClick={handleClick}
				>
					{capitalize(type)}
				</Button>
			) : (
				<Button
					bg={textColor.normal}
					_hover={{ bg: textColor.hovered }}
					onClick={handleClick}
				>
					{text}
				</Button>
			)
		) : (
			<Link
				as={ReactRouterLink}
				style={{ textDecoration: 'none' }}
				to={user ? user.profile : destination!}
			>
				<Button bg={textColor.normal} _hover={{ bg: textColor.hovered }}>
					{(image || user) && (
						<Image
							src={user ? user.image : image}
							alt={user ? user.name.full : text}
							h="1.2rem"
							w="1.2rem"
						/>
					)}
					{user || (image && text) ? (
						<Text ml={2}>{user ? user.name.first : text}</Text>
					) : (
						text && <Text>{text}</Text>
					)}
				</Button>
			</Link>
		)
	) : external ? (
		<Link href={destination} isExternal>
			{text}
		</Link>
	) : (
		<Link as={ReactRouterLink} to={user ? user.profile : destination!}>
			<Text>{user ? user.name.full : text}</Text>
		</Link>
	);

	return buttonOrLink;
};
