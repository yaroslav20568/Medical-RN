import React from 'react';
import { View } from 'react-native';
import { s } from 'react-native-wind';
import Lottie from 'lottie-react-native';

const Loader = () => {
	return (
		<View style={s`items-center`}>
			<Lottie
				source={require('../../assets/animations/Loader.json')}
				style={[s`w-20 h-20`]}
				autoPlay
				loop
			/>
		</View>
	)
}

export default Loader;