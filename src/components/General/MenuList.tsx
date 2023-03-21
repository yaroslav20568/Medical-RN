import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { s } from "react-native-wind";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { IMenuItem } from '../../types';

interface IProps {
	navigation: NavigationProp<ParamListBase>;
}

const MenuItems = [
	{name: 'Institutions', label: 'База учреждений', icon: 'institution'},
	{name: 'QuickHelp', label: 'Быстрая помощь', icon: 'handshake-o'},
	{name: 'Account', label: 'Личный кабинет', icon: 'user-o'},
	{name: 'Library', label: 'Библиотека', icon: 'book'},
	{name: 'HelpAbroad', label: 'Помощь за границей', icon: 'flag-o'},
	{name: 'Quiz', label: 'Опрос', icon: 'list-alt'}
];

const MenuList = ({ navigation }: IProps) => {
	return (
		<View style={s`mt-6`}>
			{MenuItems.map((menuItem, index) => 
				<MenuListItem 
					menuItem={menuItem} 
					navigation={navigation}
					key={`menuItem_${index}`} 
				/>
			)}
		</View>
	)
}

interface IMenuItemProps {
	menuItem: IMenuItem;
	navigation: NavigationProp<ParamListBase>;
}

const MenuListItem = ({ menuItem, navigation }: IMenuItemProps) => {
	return (
		<TouchableOpacity 
			style={s`flex-row items-center justify-between bg-white rounded-xl px-3 py-4 mb-4`}
			onPress={() => navigation.navigate(menuItem.name)}
			activeOpacity={.7}
		>
			<View style={s`flex-row items-center`}>
				<View style={[s`items-center justify-center rounded-full w-12 h-12 px-2 mr-3`, {backgroundColor: '#294CB4'}]}>
					<FontAwesome name={menuItem.icon} size={25} color='#fff' />
				</View>
				<Text style={s`text-base text-black`}>{menuItem.label}</Text>
			</View>
			<SimpleLineIcons name='arrow-right' size={20} color='#294CB4' />
		</TouchableOpacity>
	);
}

export default MenuList;