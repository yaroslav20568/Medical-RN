import React from 'react';
import { ScrollView, View } from 'react-native';
import Reactotron from 'reactotron-react-native'
import { StartPage } from './src/pages';
import { s } from "react-native-wind";

const App = () => {
	Reactotron
		.configure()
		.useReactNative()
		.connect()

  return (
    <ScrollView contentContainerStyle={s`flex-grow justify-center px-4 py-6`}>
			{/* <View style={s`flex-1 justify-center`}> */}
				<StartPage />
			{/* </View> */}
		</ScrollView>
  );
};

export default App;