import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { Login, Register, Tabs } from '../../components';
import { institutionsStore } from '../../mobx';

interface ITab {
	label: string;
	name: string;
}

const tabsElems:Array<ITab> = [
	{label: 'login', name: 'Войти'},
	{label: 'Залогиниться', name: 'Регистрация'}
];

const StartPage = observer(() => {
	const [currTab, setCurrTab] = useState<string>('login');
	const [infoText, setInfoText] = useState<string>('');
	const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);

	return (
		<ScrollView 
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`flex-grow justify-center px-4 py-6`}
		>
			<Tabs 
				tabsElems={tabsElems} 
				currTab={currTab} 
				setCurrTab={setCurrTab} 
			/>

			{currTab === 'login' ? 
				<Login 
					infoText={infoText}
					setInfoText={setInfoText}
					isDisabledBtn={isDisabledBtn} 
					setIsDisabledBtn={setIsDisabledBtn} 
				/> : 
				<Register 
					infoText={infoText}
					setInfoText={setInfoText}
					isDisabledBtn={isDisabledBtn} 
					setIsDisabledBtn={setIsDisabledBtn} 
					setCurrTab={setCurrTab}
					typesUsers={institutionsStore.typesUsers}
				/>}
		</ScrollView>
	)
})

export default StartPage;