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
	setCurrTab: (currTab: string) => void;
}

const Tabs = ({ tabsElems, currTab, setCurrTab }: IProps) => {
	return (
		<View style={s`flex-row justify-center mb-8`}>
			{tabsElems.map((tabElem, index) => 
				<TouchableOpacity 
					style={s`px-2 ${currTab === tabElem.label ? 'bg-black rounded-lg': ''}`}
					onPress={() => setCurrTab(tabElem.label)}
					key={`tabElem_${index}`}
					activeOpacity={.7}
				>
					<Text style={s`text-2xl p-1 ${currTab === tabElem.label ? 'text-white': ''}`}>{tabElem.name}</Text>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default Tabs;