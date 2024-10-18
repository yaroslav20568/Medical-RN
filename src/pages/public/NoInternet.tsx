import React from 'react';
import { Image, ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { HeaderLogo } from '../../components';

const NoInternet = () => {
	return (
		<ScrollView 
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`flex-grow justify-center px-4 py-6`}
		>
			<Image
				source={require('../../assets/images/no-internet.png')}
				style={[s`w-full`]}
				resizeMode='contain'
			/>
		</ScrollView>
	)
}

export default NoInternet;