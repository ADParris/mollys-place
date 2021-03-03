import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { EmojisIcon } from './Icon';

interface iComponentProps {
	onEmoji: (emoji: string) => void;
}

export const Emojis: React.FC<iComponentProps> = ({ onEmoji }) => {
	const handleSelection = (emoji: BaseEmoji) => onEmoji(emoji.native);

	return (
		<Menu>
			<MenuButton
				_active={{ bg: 'transparent', color: 'gray.900' }}
				_hover={{ bg: 'transparent', color: 'gray.900' }}
				as={Button}
				color="gray.500"
				h="1.8rem"
				minW="0"
				p="0"
				position="relative"
				variant="ghost"
				w="1.8rem"
			>
				<EmojisIcon />
			</MenuButton>
			<MenuList>
				<Picker
					set="facebook"
					showPreview={false}
					showSkinTones={false}
					onSelect={handleSelection}
				/>
			</MenuList>
		</Menu>
	);
};
