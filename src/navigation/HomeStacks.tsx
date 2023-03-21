import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Institutions } from '../pages';

const HomeStack = createNativeStackNavigator();

const HomeStacks = () => {
	return (
		<HomeStack.Navigator
			screenOptions={{headerShown: false}}
		>
			<HomeStack.Screen name="HomeInner" component={Home} />
			<HomeStack.Screen name="Institutions" component={Institutions} />
		</HomeStack.Navigator>
	);
}

export default HomeStacks;