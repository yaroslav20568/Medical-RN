import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { StartPage, Home, Privacy } from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface IUserData {
	email: string;
	password: string;
}

interface IRespData {
	status: string;
	data: string;
}

const Stack = createNativeStackNavigator();

const MyStack = () => {
	const navigation:NavigationProp<ParamListBase> = useNavigation();

	const getUserData = async () => {
		await AsyncStorage.clear();
		const userData: IUserData | null = JSON.parse(await AsyncStorage.getItem('@userData') as string);

		if(userData) {
			axios<IRespData>({
				url: 'http://dev6.dewpoint.of.by/api/auth',
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(userData)
			})
			.then(({ data }) => {
				if(data.status === 'success') {
					navigation.navigate('Home');
				}
			})
		}
	}

	useEffect(() => { 
		getUserData();
	}, []);

  return (
    <Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="Privacy" component={Privacy} />
			<Stack.Screen name="StartPage" component={StartPage} />
			<Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default MyStack;