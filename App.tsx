import React from 'react';
import Reactotron from 'reactotron-react-native'
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigation/Stacks';

const App = () => {
	Reactotron
		.configure()
		.useReactNative()
		.connect()

  return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
  );
};

export default App;