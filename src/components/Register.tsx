import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { s } from "react-native-wind";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';

interface IProps {
	errorText: string;
	setErrorText: (value: string) => void;
	isDisabledBtn: boolean;
	setIsDisabledBtn: (value: boolean) => void;
}

interface ITypesUsers {
	name: string;
	isChecked: boolean;
}

interface IRespData {
	status: string;
	data: string;
}

interface IFormValues {
	email: string;
	password: string;
	gender: string;
	typesUsers: Array<number>;
	city: string;
	types_users?: string;
}

const SignupSchema = Yup.object().shape({
	email: Yup.string().email('Не корректный email')
		.min(2, 'От 2 символов')
		.max(30, 'до 30 символов')
		.required('Заполните обязательно'),
	password: Yup.string()
		.min(6, 'От 6 символов')
		.max(16, 'до 16 символов')
		.required('Заполните обязательно'),
	gender: Yup.string()
		.required('Выберите пункт'),
	typesUsers: Yup.array().of(Yup.number())
		.min(1, 'Заполните хотя бы 1 чекбокс')
		.required('Заполните обязательно'),
	city: Yup.string()
		.min(2, 'От 2 символов')
		.max(16, 'до 16 символов')
		.required('Заполните обязательно')
});

const Register = ({ errorText, setErrorText, isDisabledBtn, setIsDisabledBtn }: IProps) => {
	const initialState = [
		{name: 'Люди, живущие с ВИЧ (ЛЖВ)', isChecked: false},
		{name: 'Люди, употребляющие инъекционные наркотики (ЛУИН) ', isChecked: false},
		{name: 'Работники коммерческого секса (РКС)', isChecked: false},
		{name: 'Мужчины, практикующие сексуальные контакты с мужчинами (МСМ)', isChecked: false},
		{name: 'Трансгендерные персоны (ТГ)', isChecked: false},
		{name: 'Другое', isChecked: false}
	];

	const [typesUsersArray, setTypesUsersArray] = useState<ITypesUsers[]>(initialState);
	const formValues:IFormValues = {email: '', password: '', gender: '', typesUsers: [], city: ''};

	useEffect(() => {
		setErrorText('');
	}, []);

	return (
		<>
			{/* <Text style={s`text-3xl font-bold text-gray-700 text-center mb-6`}>Зарегестрироваться</Text> */}
			<Formik
				initialValues={formValues}
				validationSchema={SignupSchema}
				onSubmit={(values, { resetForm }) => {
					const sortValues = values.typesUsers.slice().sort(function (a, b) {return a - b;})
					values = {...values, typesUsers: sortValues};
					const sendObject = {...values, types_users: values.typesUsers.join(',')} as Partial<IFormValues>;
					delete sendObject.typesUsers;

					setIsDisabledBtn(true);

					axios<IRespData>({
						url: 'http://dev6.dewpoint.of.by/api/register',
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						data: JSON.stringify(sendObject)
					})
					.then(({ data }) => {
						setIsDisabledBtn(false);

						if(data.status === 'success') {
							resetForm();
							setTypesUsersArray(initialState);
						} else {
							setErrorText(data.data);
						}
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
						<View style={s`mb-5`}>
							<RNPickerSelect
								placeholder = {{
									label: 'пол',
									value: '',
									color: '#9EA0A4',
								}}
								value={values.gender}
								onValueChange={handleChange('gender')}
								items={[
									{label: 'Мужской', value: 'Мужской'},
									{label: 'Женский', value: 'Женский'}
								]}
							/>
							{errors.gender && touched.gender ? (
								<Text style={s`text-red-900 text-base`}>{errors.gender}</Text>
							) : ''}
						</View>
						<View style={s`mb-5`}>
							{typesUsersArray.map((item, currIndex) => 
								<View style={s`flex-row items-center mb-1`} key={`checkbox_${currIndex}`}>
									<CheckBox
										value={item.isChecked}
										onValueChange={value =>
											setTypesUsersArray(typesUsersArray.map((item, index) => {
												if(currIndex === index) {
													item.isChecked = value;
													
													if(item.isChecked && !values.typesUsers.includes(currIndex)) {
														values.typesUsers = [...values.typesUsers, currIndex];
													} else {
														const findIndex = values.typesUsers.findIndex((item) => currIndex === item);
														values.typesUsers = values.typesUsers.filter((item, i) => findIndex !== i);
													}
												}

												return item;
											}))
										}
									/>
									<Text style={s`text-base mr-3`}>{item.name}</Text>
								</View>
							)}
							{errors.typesUsers && touched.gender ? (
								<Text style={s`text-red-900 text-base`}>{errors.typesUsers}</Text>
							) : ''}
						</View>
						<View style={s`mb-5`}>
							<TextInput
								placeholder='город'
								onChangeText={handleChange('city')}
								onBlur={handleBlur('city')}
								value={values.city}
								style={s`border-2 border-solid ${errors.city && touched.city ? 'border-red-900' : 'border-black-900'} text-base px-3 mb-1`}
							/>
							{errors.city && touched.city ? (
								<Text style={s`text-red-900 text-base`}>{errors.city}</Text>
							) : ''}
						</View>
						{errorText && <View style={s`mb-5`}>
							<Text style={s`text-red-900 text-base`}>{errorText}</Text>
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

export default Register;