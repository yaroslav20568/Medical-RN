import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { initAsyncStorageInspector } from "asyncstorage-inspector-flipper";
import { debugMobxActions } from 'mobx-action-flipper';
import Stacks from './src/navigation/Stacks';
import { userStore, institutionsStore, LibraryStore, chatStore } from './src/mobx';

initAsyncStorageInspector();
debugMobxActions({ userStore, institutionsStore, LibraryStore, chatStore });

const App = () => {
  return (
		<NavigationContainer>
			<Stacks />
		</NavigationContainer>
  );
};

export default App;