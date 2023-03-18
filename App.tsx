import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { initAsyncStorageInspector } from "asyncstorage-inspector-flipper";
import { debugMobxActions } from 'mobx-action-flipper';
import Stacks from './src/navigation/Stacks';
import { userStore } from './src/mobx';

initAsyncStorageInspector();
debugMobxActions({ userStore });

const App = () => {
  return (
		<NavigationContainer>
			<Stacks />
		</NavigationContainer>
  );
};

export default App;