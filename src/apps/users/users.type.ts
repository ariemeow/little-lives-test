export interface userLoginParams {
	username: string;
	password: string;
}

export interface userToken {
	uid: number;
}

export interface userLoginResponse {
	isValid: boolean;
	token?: string;
}
