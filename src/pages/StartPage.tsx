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

	return (
		<>
			<Tabs 
				tabsElems={tabsElems} 
				currTab={currTab} 
				setCurrTab={setCurrTab} 
			/>

			{currTab === 'login' ? <Login /> : <Register />}
		</>
	)
}

export default StartPage;