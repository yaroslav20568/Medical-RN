import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Chat, Calendar, Account } from '../pages';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

interface IIcon {
	color: string;
	size: number;
	focused: boolean;
}

interface ITab {
	name: string;
	label: string;
	component: any;
	icon: ({ color, size, focused }: IIcon) => ReactNode | undefined;
}

const tabItems:Array<ITab> = [
	{
		name: 'Home', 
		label: 'Главная', 
		component: Home, 
		icon: ({ color, size, focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={30} color={focused ? '#294CB4' : '#999'} />
	},
	{
		name: 'Chat',
		label: 'Чат', 
		component: Chat,
		icon: ({ focused }) => <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} size={30} color={focused ? '#294CB4' : '#999'} />
	},
	{
		name: 'Calendar',
		label: 'Календарь', 
		component: Calendar,
		icon: ({ focused }) => <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={30} color={focused ? '#294CB4' : '#999'} />
	},
	{
		name: 'Account',
		label: 'Кабинет', 
		component: Account,
		icon: ({ focused }) => <FontAwesome name={focused ? 'user' : 'user-o'} size={30} color={focused ? '#294CB4' : '#999'} />
	}
];

const Tabs = () => {
  return (
    <Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: 60
				},
				tabBarItemStyle: {
					paddingVertical: 5
					
				}
			}}
		>
      {tabItems.map((tab, index) => 
				<Tab.Screen 
					name={tab.name} 
					component={tab.component} 
					key={`tab_${index}`} 
					options={{
						tabBarLabel: ({ focused }) => <Text style={{color: focused ? '#294CB4' : '#999'}}>{tab.label}</Text>,
						tabBarIcon: tab.icon
					}}
				/>	
			)}
    </Tab.Navigator>
  );
}

export default Tabs;