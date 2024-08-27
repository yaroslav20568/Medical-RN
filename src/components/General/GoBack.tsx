import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { s } from 'react-native-wind';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { navigationType } from '../../types';

interface IProps {
	navigation: navigationType;
	onPress?: () => void;
}

const GoBack = ({ navigation, onPress }: IProps) => {
	const goBackHandle = () => {
		navigation.goBack();
		onPress && onPress();
	};

	return (
		<Animated.View 
			style={s`items-end mt-6 px-3`}
			entering={FadeInRight.duration(1000)}
		>
			<TouchableOpacity 
				onPress={goBackHandle}
				style={[s`w-10 h-10 items-center justify-center rounded-full`, {backgroundColor: '#294CB4'}]}
				activeOpacity={.7}
			>
				<AntDesign name='back' size={23} color='#fff' />
			</TouchableOpacity>
		</Animated.View>
	)
}

export default GoBack;