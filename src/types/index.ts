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

interface IArticleSections extends IItem {
	childrens: Array<IItem>;
}

interface IArticles {
	id: number;
	title: string;
	text: string;
	article_section_id: IItem;
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

export type { IUser, IMenuItem, ISelectItem, IInstitutionRB, IHelpAbroad, navigationType, IArticleSections, IArticles, IRespAuthData, IRespAuthError, IItem, ITypeUser, ITab };