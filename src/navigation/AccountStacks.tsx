import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account, Analyzes } from '../pages';
import { RootStackParams } from './HomeStacks';

const AccountStack = createNativeStackNavigator<RootStackParams>();

const AccountStacks = () => {
	return (
		<AccountStack.Navigator
			screenOptions={{headerShown: false}}
		>
			<AccountStack.Screen name="AccountInner" component={Account} options={{animation: 'slide_from_right'}} />
			<AccountStack.Screen name="Analyzes" component={Analyzes} options={{animation: 'slide_from_right'}} />
		</AccountStack.Navigator>
	);
}

export default AccountStacks;