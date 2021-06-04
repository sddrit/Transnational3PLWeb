export interface ILoginModel {
	userName: string;
	password: string;
}

export interface ILoginResponseModel {
	token: string;
	user: any;
	validTo: Date;
	roles: string[];
}
