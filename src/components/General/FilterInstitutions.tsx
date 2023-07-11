import React, { useState } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { s } from 'react-native-wind';
import CheckBox from '@react-native-community/checkbox';
import { ISelectItem } from '../../types/index';

interface IProps {
	cities: Array<ISelectItem>;
	cityId: number | '';
	setCityId: (value: number) => void;
	typesInstitution: Array<ISelectItem>;
	typeInstitutionId: number | '';
	setTypeInstitutionId: (value: number) => void;
	typesUserItems: Array<ISelectItem>;
	typesUser: Array<number>;
	setTypesUser: (value: Array<number>) => void;
}

const FilterInstitutions = ({ cities, cityId, setCityId, typesInstitution, typeInstitutionId, setTypeInstitutionId, typesUserItems, typesUser, setTypesUser }: IProps) => {
	return (
		<View>
			<RNPickerSelect
				placeholder = {{
					label: 'Город',
					value: '',
					color: '#9EA0A4',
				}}
				value={cityId}
				onValueChange={setCityId}
				items={cities}
			/>
			<RNPickerSelect
				placeholder = {{
					label: 'Тип учреждения',
					value: '',
					color: '#9EA0A4',
				}}
				value={typeInstitutionId}
				onValueChange={setTypeInstitutionId}
				items={typesInstitution}
			/>
			<View style={s`px-3 mt-1`}>
				<Text style={s`text-base px-1 mb-2`}>Типы пользователей:</Text>
				{typesUserItems.map((itemElem, index) => 
					<View 
						style={s`flex-row items-center`}
						key={`typeUser_${index}`}
					>
						<CheckBox
							value={typesUser.includes(itemElem.value)}
							onValueChange={(value) => {
								if(!typesUser.includes(itemElem.value)) {
									setTypesUser([...typesUser, itemElem.value]);
								} else {
									setTypesUser(typesUser.filter((item) => item !== itemElem.value));
								}
							}}
						/>
						<Text style={s`text-sm`}>{itemElem.label}</Text>
					</View>
				)}
			</View>
		</View>
	)
}

export default FilterInstitutions;