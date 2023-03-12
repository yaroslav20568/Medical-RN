interface IUser {
	id: number;
	email: string;
	city: string;
	gender: string;
	types_users: string;
}

interface IMenuItem {
	name: string;
	label: string;
	icon: string;
}

export type { IUser, IMenuItem };