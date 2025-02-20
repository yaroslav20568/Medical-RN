import React from 'react';
import { View, TextInput } from 'react-native';
import { s } from 'react-native-wind';

interface IProps {
	name: string;
	setName: (name: string) => void;
}

const InstitutionSearch = ({ name, setName }: IProps) => {
	const onSetValue = (textValue: string): void => {
		setName(textValue);
	};

	return (
		<View>
			<TextInput
				placeholder='Название учреждения'
				value={name}
				onChangeText={onSetValue}
				style={s`border-2 border-solid border-black-900 text-base px-3 mb-1`}
			/>
		</View>
	)
}

export default InstitutionSearch;