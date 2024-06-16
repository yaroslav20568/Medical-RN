import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { s } from 'react-native-wind';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { navigationType } from '../../types';

interface IProps {
	navigation: navigationType;
}

const GoBack = ({ navigation }: IProps) => {
	const goBackHandle = () => {
		navigation.goBack();
	};

	return (
		<Animated.View 
			style={s`items-end mt-6 px-3`}
			entering={FadeInRight.duration(1000)}
		>
			<TouchableOpacity 
				onPress={goBackHandle}
				style={[s`p-2 rounded-full`, {backgroundColor: '#294CB4'}]}
				activeOpacity={.7}
			>
				<AntDesign name='back' size={23} color='#fff' />
			</TouchableOpacity>
		</Animated.View>
	)
}

export default GoBack;