import { Input } from '@chakra-ui/react';
import React from 'react';
import { StorageMutations } from '../../../api/firebase';
import { CustomButtonOrLink } from '../../CustomButtonOrLink';
import { iFileUploadResponse, iSelectedState } from '../../../types/post';
import { resizeImage } from '../../../helpers';

interface ComponentProps {
	handleSelection: (selected: iSelectedState) => void;
}

export const AddImageButton: React.FC<ComponentProps> = ({
	handleSelection,
}) => {
	const storageMutations = new StorageMutations();

	const openImageSelectRef = React.useRef<HTMLInputElement>(null);

	const handleImageSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const fileList = event.target.files;
		if (!fileList) return;

		const image = await resizeImage(fileList[0]);

		const resp: iFileUploadResponse = await storageMutations.upload(
			image as File
		);
		if (resp.success) {
			handleSelection({ type: 'image', payload: resp.success });
		} else if (resp.error) {
			console.error(resp.error);
		}
	};

	const handleTriggerSelect = () => {
		openImageSelectRef.current && openImageSelectRef.current.click();
	};

	return (
		<>
			<CustomButtonOrLink handleClick={handleTriggerSelect} text="Image" />
			<Input
				display="none"
				onChange={handleImageSelect}
				ref={openImageSelectRef}
				type="file"
			/>
		</>
	);
};
