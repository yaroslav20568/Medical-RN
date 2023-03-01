import React, { useState } from 'react';
import { Login, Register } from '../components';

const StartPage = () => {
	const [currTab, setCurrTab] = useState<string>('login');

	return (
		<>
			{currTab === 'login' ? <Login /> : <Register />}
		</>
	)
}

export default StartPage;