import React from 'react';
import { View, ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { HeaderLogo, Map } from '../../components';

const Institutions = () => {
	return (
		<View style={s`mb-3`}>
			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<HeaderLogo 
					logo={require('../../assets/images/vstrecha-logo.png')} 
				/>
				<Map />
			</ScrollView>
		</View>
	)
}

export default Institutions;