import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
	title: string;
	showModal: () => void;
}

const WidgetsPanel = ({ title, showModal }: IProps) => {
	return (
		<View style={s`p-4 flex-row items-center justify-between`}>
			<Text style={s`text-2xl font-semibold text-black`}>{title}</Text>
			<View style={s`flex-row`}>
				<TouchableOpacity 
					onPress={() => showModal()}
					style={[s`p-2 rounded-full mr-6`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<AntDesign name='search1' size={23} color='#fff' />
				</TouchableOpacity>
				<TouchableOpacity 
					style={[s`p-2 rounded-full`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<AntDesign name='filter' size={23} color='#fff' />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default WidgetsPanel;