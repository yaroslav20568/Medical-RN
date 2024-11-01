import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './src/navigation/Stacks';

const App = () => {
  return (
		<NavigationContainer>
			<Stacks />
		</NavigationContainer>
  );
};

export default App;