import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartPage, Privacy, NoInternet } from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNetInfo } from '@react-native-community/netinfo';
import { observer } from 'mobx-react-lite';
import SplashScreen from 'react-native-splash-screen';
import { userStore, institutionsStore } from '../mobx';
import { IRespAuthData, IUser } from '../types';
import { Tabs } from '../navigation';
import { siteUrl }  from '../constants';

interface IUserData extends IRespAuthData {}

const Stack = createNativeStackNavigator();

const Stacks = observer(() => {
	const { isConnected } = useNetInfo();

  const getUserData = async () => {
    const userData: IUserData | null = JSON.parse(
      (await AsyncStorage.getItem('@userData')) as string,
    );

    if (userData) {
      axios<IUser>({
        url: `${siteUrl}/api/auth`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.accessToken}`,
        },
      }).then(response => {
        if (response.status === 200) {
          userStore.setIsAuth(true);
          userStore.setUserData(response.data);
        }
      })
    }
  };

  useEffect(() => {
		SplashScreen.hide();
    getUserData();
		institutionsStore.loadTypesUsers();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
			{!isConnected && isConnected !== null ? 
				<Stack.Screen name="NoInternet" component={NoInternet} options={{animation: 'slide_from_right'}} /> :
				!userStore.isAuth ? 
					<>
						<Stack.Screen name="Privacy" component={Privacy} options={{animation: 'slide_from_right'}} />
						<Stack.Screen name="StartPage" component={StartPage} options={{animation: 'slide_from_right'}} />
					</> : 
					<Stack.Screen name="Tabs" component={Tabs} options={{animation: 'slide_from_right'}} />}
    </Stack.Navigator>
  );
});

export default Stacks;
