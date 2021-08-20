export interface IUserCredentials {
	email: string;
	password: string;
}

export enum UserRole {
	ADMIN = `admin`,
	PUBLIC = `public`,
	USER = `user`,
}

export interface IUser {
	createdAt: number;
	id?: string;
	image?: string;
	name: string;
	role?: UserRole;
	updatedAt?: number;
}
