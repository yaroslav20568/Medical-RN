import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartPage, Privacy } from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { userStore, institutionsStore } from '../mobx';
import { IRespAuthData, IUser } from '../types';
import { Tabs } from '../navigation';
import { siteUrl }  from '../constants';

interface IUserData extends IRespAuthData {}

const Stack = createNativeStackNavigator();

const Stacks = observer(() => {
  const getUserData = async () => {
    // await AsyncStorage.clear();
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
    getUserData();
		institutionsStore.getTypesUsers();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!userStore.isAuth ? (
        <>
          <Stack.Screen name="Privacy" component={Privacy} options={{animation: 'slide_from_right'}} />
          <Stack.Screen name="StartPage" component={StartPage} options={{animation: 'slide_from_right'}} />
        </>
      ) : (
        <Stack.Screen name="Tabs" component={Tabs} />
      )}
    </Stack.Navigator>
  );
});

export default Stacks;
