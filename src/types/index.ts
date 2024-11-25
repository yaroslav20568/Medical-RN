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
	cityId: number;
	region?: string;
	city: {
		id: number;
		name: string;
		countryId: number;
		country: IItem;
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
	typeId: number;
	type: IItem;
	photo: string;
	typesUsers: string;
}

type navigationType = NavigationProp<ParamListBase>;

interface ILibraryArticle extends IItem {
	parent: number;
	childrens?: Array<ILibraryArticle>;
	deep?: number;
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

interface IUserForm {
	email: string;
	password: string;
	gender: string;
	city: string;
	file: object | null;
	role: string;
}

interface IUserFormValues extends IUserForm {
	typesUsers: Array<number>;
}

interface IUserFormRegister extends IUserForm {
	typesUsers: string;
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
	user: IUser;
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
	isRead: boolean;
}

interface IHotline extends IItem {
	type: string;
  phone: string;
  services: string;
  addInfo: string;
  typesUsers: string;
}

interface IQuestion extends IItem {
  answers: Array<IQuestionAnswer>;
}

interface IQuestionAnswer extends IItem {
	questionId: number;
}

interface IQuestionWithResult extends IQuestion {
	questionResults: Array<IQuestionResult>;
}

interface IQuestionResult {
	id: number;
	questionId: number;
	questionAnswerId: number;
	userId: number;
}

interface ICalendarEvent extends IItem {
	userId: number;
	user: IUser;
	typeEvent: string;
	dateEvent: string;
}

interface IAnalysis extends IItem {
	userId: number;
	user: IUser;
  category: string;
  photo: string;
	date: string;
}

interface IModalStyles {
	opacity: number;
	transform: {
		translateX: number;
	}[];
}

export type { IUser, IMenuItem, ISelectItem, IInstitution, navigationType, ILibraryArticle, ILibraryItem, IRespAuthData, IRespAuthError, IItem, ITypeUser, ITab, IUserFormValues, IUserFormRegister, IImage, IRespChatData, IDialog, IMessage, IHotline, IQuestion, IQuestionWithResult, ICalendarEvent, IAnalysis, IModalStyles };