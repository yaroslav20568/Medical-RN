import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartPage, Privacy } from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { userStore } from '../mobx';
import { IUser } from '../types';
import Tabs from './Tabs';
import { siteUrl } from '../constants';

interface IUserData {
	email: string;
	password: string;
}

interface IRespData {
	status: string;
	data: {
		user: IUser;
	};
}

const Stack = createNativeStackNavigator();

const Stacks = observer(() => {
	const getUserData = async () => {
		// await AsyncStorage.clear();
		const userData: IUserData | null = JSON.parse(await AsyncStorage.getItem('@userData') as string);

		if(userData) {
			axios<IRespData>({
				url: `${siteUrl}/api/auth`,
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(userData)
			})
			.then(({ data }) => {
				if(data.status === 'success') {
					userStore.setIsAuth(true);
					userStore.setUserData(data.data.user);
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
			{!userStore.isAuth ? 
				<>
					<Stack.Screen name="Privacy" component={Privacy} />
					<Stack.Screen name="StartPage" component={StartPage} />
				</> : 
				<Stack.Screen name="Tabs" component={Tabs} />
			}
    </Stack.Navigator>
  );
})

export default Stacks;