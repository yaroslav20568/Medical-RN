import React, { useState } from 'react';
import { Login, Register, Tabs } from '../components';

interface ITab {
	label: string;
	name: string;
}

const tabsElems:Array<ITab> = [
	{label: 'login', name: 'Войти'},
	{label: 'Залогиниться', name: 'Регистрация'}
];

const StartPage = () => {
	const [currTab, setCurrTab] = useState<string>('login');
	const [errorText, setErrorText] = useState<string>('');
	const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);

	return (
		<>
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
				/> : 
				<Register 
					errorText={errorText}
					setErrorText={setErrorText}
					isDisabledBtn={isDisabledBtn} 
					setIsDisabledBtn={setIsDisabledBtn} 
				/>}
		</>
	)
}

export default StartPage;