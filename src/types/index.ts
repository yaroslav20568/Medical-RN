import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ReactNode } from 'react';

interface IUser {
	id: number;
	email: string;
	city: string;
	gender: string;
	typesUsers: string;
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
	// childrens: Array<IItem>;
	parent: number;
}

interface ILibraryItem {
	id: number;
	title: string;
	text: string;
	libraryArticleId: number;
	libraryArticle: ILibraryArticle;
}

interface IRespAuthData {
	accessToken: string;
	refreshToken: string; 
	user: {
		id: number;
		city: string;
		email: string;
		gender: string; 
		typesUsers: string;
	}
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

export type { IUser, IMenuItem, ISelectItem, IInstitutionRB, IHelpAbroad, navigationType, ILibraryArticle, ILibraryItem, IRespAuthData, IRespAuthError, IItem, ITypeUser, ITab };