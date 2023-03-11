import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { initAsyncStorageInspector } from "asyncstorage-inspector-flipper";
import { debugMobxActions } from 'mobx-action-flipper';
import MyStack from './src/navigation/Stacks';
import { userStore } from './src/mobx';

initAsyncStorageInspector();
debugMobxActions({ userStore });

const App = () => {
  return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
  );
};

export default App;