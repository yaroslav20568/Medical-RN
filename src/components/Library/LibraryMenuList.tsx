import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { s } from 'react-native-wind';
import { IArticleSections } from '../../types';

interface IProps {
	menuItems: Array<IArticleSections>;
	onHandleNavigation: (id: number, name: string) => void;
}

const LibraryMenuList = ({ menuItems, onHandleNavigation }: IProps) => {
	return (
		<>
			{menuItems.map((item) => 
				<TouchableOpacity 
					style={s`flex-row items-center justify-between bg-white rounded-xl px-3 py-4 mb-4`}
					onPress={() => onHandleNavigation(item.id, item.name)}
					activeOpacity={.7}
				>
					<View style={s`flex-row items-center`}>
						<Text style={s`text-base text-black`}>{item.name}</Text>
					</View>
					<SimpleLineIcons name='arrow-right' size={20} color='#294CB4' />
				</TouchableOpacity>
			)}
		</>
	)
}

export default LibraryMenuList;