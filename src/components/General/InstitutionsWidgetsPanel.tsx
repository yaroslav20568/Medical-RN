import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface IProps {
	title: string;
	showSearchModal: () => void;
	showFilterModal: () => void;
}

const InstitutionsWidgetsPanel = ({ title, showSearchModal, showFilterModal }: IProps) => {
	return (
		<Animated.View 
			style={s`py-3 px-3 flex-row items-center justify-between`} 
			entering={FadeInUp.delay(300).duration(1000)}
		>
			<Text style={s`text-2xl font-semibold text-black`}>{title}</Text>
			<View style={s`flex-row`}>
				<TouchableOpacity 
					onPress={showSearchModal}
					style={[s`w-10 h-10 items-center justify-center rounded-full mr-6`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<AntDesign name='search1' size={23} color='#fff' />
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={showFilterModal}
					style={[s`w-10 h-10 items-center justify-center rounded-full`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<AntDesign name='filter' size={23} color='#fff' />
				</TouchableOpacity>
			</View>
		</Animated.View>
	)
}

export default InstitutionsWidgetsPanel;