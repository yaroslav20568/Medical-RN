import React, { useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { s } from "react-native-wind";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../../mobx';
import { siteUrl } from '../../constants';
import { IRespAuthData, IRespAuthError } from '../../types';

interface IProps {
	infoText: string;
	setInfoText: (value: string) => void;
	isDisabledBtn: boolean;
	setIsDisabledBtn: (value: boolean) => void;
}

interface IFormValues {
	email: string;
	password: string;
}

const SignupSchema = Yup.object().shape({
	email: Yup.string().email('Не корректный email')
		.min(2, 'От 2 символов')
		.max(30, 'до 30 символов')
		.required('Заполните обязательно'),
	password: Yup.string()
		.min(6, 'От 6 символов')
		.max(16, 'до 16 символов')
		.required('Заполните обязательно')
});

const Login = ({ infoText, setInfoText, isDisabledBtn, setIsDisabledBtn }: IProps) => {
	const formValues:IFormValues = {email: '', password: ''};

	useEffect(() => {
		setInfoText('');
	}, []);

	return (
		<>
			<Formik
				initialValues={formValues}
				validationSchema={SignupSchema}
				onSubmit={(values, { resetForm }) => {
					setIsDisabledBtn(true);
					
					axios<IRespAuthData>({
						url: `${siteUrl}/api/login`,
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						data: JSON.stringify(values)
					})
					.then((response) => {
						setIsDisabledBtn(false);

						if(response.status === 200) {
							setInfoText('Вы залогинены');
							AsyncStorage.setItem('@userData', JSON.stringify(response.data));
							resetForm();
							setTimeout(() => {userStore.setIsAuth(true);}, 1000);
						}
					})
					.catch(({ response }: IRespAuthError) => {
						setIsDisabledBtn(false);
						setInfoText(response.data.message);
					})
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
					<View>
						<View style={s`mb-4`}>
							<TextInput
								placeholder='email'
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								value={values.email}
								style={s`border-2 border-solid ${errors.email && touched.email ? 'border-red-900' : 'border-black-900'} text-base px-3 mb-1`}
							/>
							{errors.email && touched.email ? (
								<Text style={s`text-red-900 text-base`}>{errors.email}</Text>
							) : ''}
						</View>
						<View style={s`mb-5`}>
							<TextInput
								placeholder='пароль'
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								style={s`border-2 border-solid ${errors.password && touched.password ? 'border-red-900' : 'border-black-900'} text-base px-3 mb-1`}
								secureTextEntry={true}
							/>
							{errors.password && touched.password ? (
								<Text style={s`text-red-900 text-base`}>{errors.password}</Text>
							) : ''}
						</View>
						{infoText && <View style={s`mb-5`}>
							<Text style={s`text-red-900 text-base`}>{infoText}</Text>
						</View>}
						<TouchableOpacity 
							style={s`bg-violet-700 border-rose-700 py-3`}
							onPress={handleSubmit}
							activeOpacity={.7}
							disabled={isDisabledBtn}
						>
							<Text style={s`text-white text-center text-lg`}>Залогиниться</Text>
						</TouchableOpacity>
					</View>
				)}
			</Formik>
		</>
	)
}

export default Login;