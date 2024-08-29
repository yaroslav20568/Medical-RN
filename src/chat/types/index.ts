import { User } from "@prisma/client";

interface IMessageUser {
	time: string;
	text: string;
	userId: number;
	user: User;
	dialogId?: number;
}

interface ISetAdminDialog {
	dialogId: number;
	adminId: number;
}

export { IMessageUser, ISetAdminDialog };