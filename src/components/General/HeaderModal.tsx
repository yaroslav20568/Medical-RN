import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { s } from 'react-native-wind'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
	title: string;
	hideModal: () => void;
}

const HeaderModal = ({ title, hideModal }: IProps) => {
	return (
		<View style={s`flex-row items-center justify-between mb-3`}>
			<Text style={s`text-xl font-medium`}>{title}</Text>
			<TouchableOpacity
				onPress={() => hideModal()}
				activeOpacity={.7}
			>
				<AntDesign name='closecircleo' size={30} />
			</TouchableOpacity>
		</View>
	)
}

export default HeaderModal