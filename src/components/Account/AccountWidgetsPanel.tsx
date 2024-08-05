import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface IProps {
	title: string;
	showModal: () => void;
	showConfirmModal: () => void;
}

const AccountWidgetsPanel = ({ title, showModal, showConfirmModal }: IProps) => {
	return (
		<View style={s`py-4 px-3 flex-row items-center justify-between`}>
			<Animated.Text 
				style={s`text-2xl font-semibold text-black`}
				entering={FadeInLeft.delay(300).duration(1000)}
			>
				{title}
			</Animated.Text>
			<Animated.View 
				style={s`flex-row`}
				entering={FadeInRight.delay(300).duration(1000)}
			>
				<TouchableOpacity 
					onPress={showConfirmModal}
					style={[s`w-10 h-10 items-center justify-center rounded-full mr-6`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<FontAwesome5 name='user-minus' size={18} color='#fff' />
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={showModal}
					style={[s`w-10 h-10 items-center justify-center rounded-full`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<FontAwesome5 name='user-edit' size={18} color='#fff' />
				</TouchableOpacity>
			</Animated.View>
		</View>
	)
}

export default AccountWidgetsPanel;