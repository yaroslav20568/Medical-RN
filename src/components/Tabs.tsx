import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';

interface ITab {
	label: string;
	name: string;
}

interface IProps {
	tabsElems: Array<ITab>;
	currTab: string;
	setCurrTab: (e: string) => {}
}

const Tabs = ({ tabsElems, currTab, setCurrTab }: IProps) => {
	return (
		<View style={s`flex-row justify-center mb-8`}>
			{tabsElems.map((item, index) => 
				<TouchableOpacity 
					style={s`px-2 ${currTab === item.label ? 'bg-black rounded-lg': ''}`}
					onPress={() => setCurrTab(item.label)}
					key={`tab_${index}`}
					activeOpacity={.7}
				>
					<Text style={s`text-2xl p-1 ${currTab === item.label ? 'text-white': ''}`}>{item.name}</Text>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default Tabs;