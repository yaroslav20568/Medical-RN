import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
	title: string;
	showModal: () => void;
	setModalActive: (value: string) => void;
}

const WidgetsPanel = ({ title, showModal, setModalActive }: IProps) => {
	const onShowSearch = () => {
		setModalActive('search');
		showModal();
	}

	const onShowFilter = () => {
		setModalActive('filter');
		showModal();
	}

	return (
		<View style={s`py-4 px-3 flex-row items-center justify-between`}>
			<Text style={s`text-2xl font-semibold text-black`}>{title}</Text>
			<View style={s`flex-row`}>
				<TouchableOpacity 
					onPress={onShowSearch}
					style={[s`p-2 rounded-full mr-6`,{backgroundColor: '#294CB4'}]}
					activeOpacity={.7}
				>
					<AntDesign name='search1' size={23} color='#fff' />
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={onShowFilter}
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