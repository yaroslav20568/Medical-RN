import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendar, Account } from '../pages';
import { CustomTabs, HomeStacks, ChatStacks } from '../navigation';
import { ITab } from '../types';

const Tab = createBottomTabNavigator();

const tabItems:Array<ITab> = [
	{
		name: 'Home', 
		label: 'Главная', 
		component: HomeStacks, 
		icon: 'home'
	},
	{
		name: 'Chat',
		label: 'Чат', 
		component: ChatStacks,
		icon: 'wechat'
	},
	{
		name: 'Calendar',
		label: 'Календарь', 
		component: Calendar,
		icon: 'calendar'
	},
	{
		name: 'Account',
		label: 'Кабинет', 
		component: Account,
		icon: 'user'
	}
];

const Tabs = () => {
  return (
    <Tab.Navigator
			screenOptions={{headerShown: false}}
			tabBar={(props) => <CustomTabs {...props} tabItems={tabItems} />}
		>
      {tabItems.map((tab, index) => 
				<Tab.Screen 
					name={tab.name} 
					component={tab.component} 
					key={`tab_${index}`} 
				/>	
			)}
    </Tab.Navigator>
  );
}

export default Tabs;