import React from 'react';
import { View, Text } from 'react-native';
import { s } from 'react-native-wind';
import Lottie from 'lottie-react-native';

const Loader = () => {
	return (
		<View style={s`items-center`}>
			<Lottie
				source={require('../../assets/animations/Loader.json')}
				style={s`w-1/4`}
				autoPlay
				loop
			/>
		</View>
	)
}

export default Loader;