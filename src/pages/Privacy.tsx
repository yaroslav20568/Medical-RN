import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { s } from 'react-native-wind';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Privacy = () => {
	const navigation:NavigationProp<ParamListBase> = useNavigation();

	const [isChecked, setIsChecked] = useState<boolean>(false);

	const getUserData = async () => {
		const res = await AsyncStorage.getItem('@userData');
		console.log(res);
	}

	useEffect(() => { 
		getUserData();
	}, []);

	return (
		<ScrollView contentContainerStyle={s`flex-grow justify-center px-4 py-6`}>
			<View style={s`border-2 border-orange-300 rounded-xl px-3 py-4 mb-8`}>
				<Text style={s`text-base text-center`}>В соответствии с закондательством Республики Беларусь оказывать консультационные услуги можно гражданам с 18 лет</Text>
			</View>
			<View style={s`flex-row items-center justify-center mb-8`}>
				<CheckBox
					value={isChecked}
					onValueChange={value => setIsChecked(value)}
				/>
				<Text>Подтвержаю, что мне есть 18 лет</Text>
			</View>
			<View style={s`items-center`}>
				<TouchableOpacity
					style={s`w-3/5 ${isChecked ? 'bg-orange-400' : 'bg-gray-400'} justify-center rounded-lg py-2`}
					onPress={() => navigation.navigate('StartPage')}
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