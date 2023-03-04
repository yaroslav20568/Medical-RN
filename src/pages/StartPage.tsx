import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { s } from 'react-native-wind';
import { Login, Register, Tabs } from '../components';

interface IProps {
	navigation: NavigationProp<ParamListBase>;
}

interface ITab {
	label: string;
	name: string;
}

const tabsElems:Array<ITab> = [
	{label: 'login', name: 'Войти'},
	{label: 'Залогиниться', name: 'Регистрация'}
];

const StartPage = ({ navigation }: IProps) => {
	const [currTab, setCurrTab] = useState<string>('login');
	const [errorText, setErrorText] = useState<string>('');
	const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);

	return (
		<ScrollView contentContainerStyle={s`flex-grow justify-center px-4 py-6`}>
			<Tabs 
				tabsElems={tabsElems} 
				currTab={currTab} 
				setCurrTab={setCurrTab} 
			/>

			{currTab === 'login' ? 
				<Login 
					errorText={errorText}
					setErrorText={setErrorText}
					isDisabledBtn={isDisabledBtn} 
					setIsDisabledBtn={setIsDisabledBtn} 
					navigation={navigation}
				/> : 
				<Register 
					errorText={errorText}
					setErrorText={setErrorText}
					isDisabledBtn={isDisabledBtn} 
					setIsDisabledBtn={setIsDisabledBtn} 
				/>}
		</ScrollView>
	)
}

export default StartPage;