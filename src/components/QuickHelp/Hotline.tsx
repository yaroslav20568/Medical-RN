import React from 'react';
import { Linking, Text, View } from 'react-native';
import { s } from 'react-native-wind';
import { IHotline } from '../../types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { institutionsStore } from '../../mobx';

interface IProps extends IHotline {
	index: number;
}

const Hotline = ({ type, name, phone, services, addInfo, typesUsers, index }: IProps) => {
	return (
		<View>
			<Text 
				style={[s`text-xl font-bold text-black mb-3`, {lineHeight: 24}]}
			>
				{index + 1}. {type}
			</Text>
			<Text 
				style={[s`text-base font-bold text-black mb-3`, {lineHeight: 24}]}
			>
				от {name}
			</Text>
			<View style={s`flex-row ml-1 mb-3`}>
				<FontAwesome 
					name='phone' 
					size={25} 
					color='#294CB4' 
					style={s`mr-2`}
				/>
				<Text 
					style={s`text-base text-black pr-8`}
					onPress={() => Linking.openURL(`tel:${phone}`)}
				>
					{phone}
				</Text>
			</View>
			<View style={s`flex-row ml-0.5 mb-3`}>
				<MaterialIcons 
					name='design-services' 
					size={25} 
					color='#294CB4' 
					style={s`mr-2`}
				/>
				<Text style={s`text-base text-black pr-8`}>{services}</Text>
			</View>
			<View style={s`mb-3`}>
				<Text style={s`text-lg font-bold text-black mb-2`}>Дополнительная информация</Text>
				<Text style={s`text-base text-black`}>{addInfo}</Text>
			</View>
			<View>
				<Text style={s`text-lg font-bold text-black mb-2`}>К какому типу пользователей относится</Text>
				<View>
					{typesUsers.split(',').map((typeUser, index) => 
						<Text
							style={s`text-base text-black`}
							key={`typeUser_${index}`}
						>
							{index + 1}. {institutionsStore.typesUsers[+typeUser].name}
						</Text>
					)}
				</View>
			</View>
		</View>
	)
}

export default Hotline;