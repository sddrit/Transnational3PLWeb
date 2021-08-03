export interface ILoginModel {
	userName: string;
	password: string;
}

export interface ILoginResponseModel {
	token: string;
	user: IUser;
	validTo: Date;
	roles: string[];
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	active: boolean;
}

export interface ICreateUser {
	id: number;
	username: string;
	email: string;
	active: boolean;
	password: string;
	confirmPassword: string;
}
