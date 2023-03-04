import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { StartPage, Home, Privacy } from '../pages';

const Stack = createNativeStackNavigator();

const MyStack = () => {
	const navigation:NavigationProp<ParamListBase> = useNavigation();

	if (false) {
		navigation.navigate('Home');
	}

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