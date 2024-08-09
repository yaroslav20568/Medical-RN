import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { s } from 'react-native-wind'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

interface IProps {
	title: string;
	hideModal: () => void;
	clearFilterParams?: () => void;
}

const HeaderModal = ({ title, hideModal, clearFilterParams }: IProps) => {
	return (
		<View style={s`flex-row items-center justify-between mb-3`}>
			<Text style={s`text-xl font-medium`}>{title}</Text>
			<View style={s`flex-row`}>
				{clearFilterParams && <TouchableOpacity
					onPress={() => clearFilterParams()}
					activeOpacity={.7}
					style={s`mr-3`}
				>
					<Feather name='delete' size={30} />
				</TouchableOpacity>}
				<TouchableOpacity
					onPress={() => hideModal()}
					activeOpacity={.7}
				>
					<AntDesign name='closecircleo' size={30} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default HeaderModal