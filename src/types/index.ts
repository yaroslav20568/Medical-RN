import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface IUser {
	id: number;
	email: string;
	city: string;
	gender: string;
	typesUsers: string;
	role: string;
}

interface IMenuItem {
	name: string;
	label: string;
	icon: string;
}

interface IItem {
	id: number;
	name: string;
}

interface ISelectItem {
	label: string;
	value: number;
	isChecked?: boolean;
}

interface IInstitution extends IItem {
	cityId: IItem;
	city: {
		id: number;
		name: string;
		countryId: number;
		country: {
			id: number;
			name: string;
		}
	}
	address: string;
	coordinates: string;
	phone: string;
	email: string;
	socialNetwork: string;
	linkWebsite: string;
	description: string;
	addInfo: string;
	workingHours: string;
	typeId: IItem;
	type: {
		id: number;
		name: string;
	}
	photo: string;
	typesUsers: string;
}

interface IInstitutionRB extends IInstitution {
	region: string;
}

interface IHelpAbroad extends IInstitution {
	countryId: IItem;
}

type navigationType = NavigationProp<ParamListBase>;

interface ILibraryArticle extends IItem {
	parent: number;
}

interface ILibraryItem {
	id: number;
	title: string;
	text: string;
	libraryArticleId: number;
	libraryArticle: ILibraryArticle;
}

interface IUser {
	id: number;
	city: string;
	email: string;
	gender: string; 
	typesUsers: string;
	imageUrl: string;
}

interface IRespAuthData {
	accessToken: string;
	refreshToken: string; 
	user: IUser;
}

interface IRespAuthError {
	response: {
		data: {
			error?: string;
			message: string;
			statusCode: number;
		}
	}
}

interface ITypeUser extends IItem {
	isChecked?: boolean;
}

interface ITab {
	name: string;
	label: string;
	component: any;
	icon: string;
}

interface IUserFormValues {
	email: string;
	password: string;
	gender: string;
	typesUsersArr: Array<number>;
	city: string;
	typesUsers?: string;
	file: object | null;
	role: string;
}

interface IImage {
	name: string | undefined;
	type: string | undefined;
	uri: string | undefined;
}

interface IRespChatData {
	messages: Array<IMessage>;
}

interface IDialog {
	id: number;
	userId: number;
	adminId: number;
	messages: Array<IMessage>;
}

interface IMessage {
	id: number;
	time: string;
	text: string;
	userId: number;
	user: IUser;
	dialogId: number;
}

export type { IUser, IMenuItem, ISelectItem, IInstitutionRB, IHelpAbroad, navigationType, ILibraryArticle, ILibraryItem, IRespAuthData, IRespAuthError, IItem, ITypeUser, ITab, IUserFormValues, IImage, IRespChatData, IDialog, IMessage };