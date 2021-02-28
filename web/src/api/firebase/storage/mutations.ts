import { firebase } from '../';
import { iFileDeleteResponse, iFileUploadResponse } from '../../../types/post';

export class StorageMutations {
	delete: (name: File['name']) => Promise<iFileDeleteResponse>;
	upload: (file: File) => Promise<iFileUploadResponse>;

	constructor() {
		this.delete = async (name: File['name']): Promise<iFileDeleteResponse> => {
			const fileRef = firebase.storage().ref(`images/${name}`);
			try {
				await fileRef.delete();
				return { success: true };
			} catch (err) {
				console.error(`Error while deleting file... ${err.message}`);
				return { error: { from: 'imageDelete', msg: err.message } };
			}
		};

		this.upload = async (file: File): Promise<iFileUploadResponse> => {
			const storageRef = firebase.storage().ref(`images/${file.name}`);
			try {
				const snapshot = await storageRef.put(file);
				const link = await snapshot.ref.getDownloadURL();
				const success = { link, name: snapshot.ref.name };
				return { success };
			} catch (err) {
				return {
					error: { from: 'imageUpload', msg: err.message },
				};
			}
		};
	}
}
