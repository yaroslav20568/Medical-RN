import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { s } from 'react-native-wind';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface IProps {
	navigation: NavigationProp<ParamListBase>;
}

const Privacy = ({ navigation }: IProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const onNavigate = (): void => {
		navigation.navigate('StartPage');
	};

	return (
		<ScrollView 
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`flex-grow justify-center px-4 py-6`}
		>
			<View style={s`border-2 border-orange-300 rounded-xl px-3 py-3 mb-8`}>
				<Text style={s`text-lg text-center`}>В соответствии с закондательством Республики Беларусь оказывать консультационные услуги можно гражданам с 18 лет</Text>
			</View>
			<View style={s`flex-row items-center justify-center mb-8`}>
				<BouncyCheckbox
					size={20}
					fillColor='#a8a29e'
					unFillColor='transparent'
					textComponent={<Text style={s`text-base ml-3`}>Подтвержаю, что мне есть 18 лет</Text>}
					iconStyle={s`text-gray-400 rounded-none`}
					innerIconStyle={s`border-2 rounded-none`}
					isChecked={isChecked}
					onPress={value => setIsChecked(value)}
				/>
			</View>
			<View style={s`items-center`}>
				<TouchableOpacity
					style={s`w-full ${isChecked ? 'bg-orange-400' : 'bg-gray-400'} rounded-lg py-2`}
					onPress={onNavigate}
					activeOpacity={.7}
					disabled={!isChecked}
				>
					<Text style={s`text-white text-center text-lg color-orange-900`}>Продолжить</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default Privacy;