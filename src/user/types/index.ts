interface ITokens {
	accessToken: string;
	refreshToken: string;
}

interface IUser {
	id: number;
	email: string;
	gender: string;
	typesUsers: string;
	city: string;
	imageUrl: string;
	role: string;
}

interface IUserModific {
	user: IUser;
}

interface IUserWithTokens extends IUserModific, ITokens {}

export { ITokens, IUser, IUserModific, IUserWithTokens };