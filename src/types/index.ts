import {NavigationProp, ParamListBase} from '@react-navigation/native';

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
	city_id: IItem;
	address: string;
	coordinates: string;
	phone: string;
	email: string;
	social_network: string;
	link_website: string;
	description: string;
	add_info: string;
	working_hours: string;
	type_id: IItem;
	photo: string;
	types_users: Array<IItem>;
}

interface IInstitutionRB extends IInstitution {
	region: string;
}

interface IHelpAbroad extends IInstitution {
	country_id: IItem;
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

export type { IUser, IMenuItem, ISelectItem, IInstitutionRB, IHelpAbroad, navigationType, IArticleSections, IArticles };