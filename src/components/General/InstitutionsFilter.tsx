import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { s } from 'react-native-wind';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ISelectItem, ITypeUser } from '../../types/index';

type callbackSetTypesUser = (value: Array<number>) => Array<number>;

interface IProps {
	cities: Array<ISelectItem>;
	cityId: number | '';
	setCityId: (value: number) => void;
	typesInstitution: Array<ISelectItem>;
	typeInstitutionId: number | '';
	setTypeInstitutionId: (value: number) => void;
	typesUsers: Array<ITypeUser>;
	typesUsersNum: Array<number>;
	setTypesUsersNum: (value: callbackSetTypesUser) => void;
}

const InstitutionsFilter = ({ cities, cityId, setCityId, typesInstitution, typeInstitutionId, setTypeInstitutionId, typesUsers, typesUsersNum, setTypesUsersNum }: IProps) => {
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
				<Text style={s`text-base px-1 mb-2`}>Тип пользователей:</Text>
				{typesUsers.map((itemElem, index) => 
					<View 
						style={s`flex-row items-center`}
						key={`typeUser_${index}`}
					>
						<BouncyCheckbox
							size={20}
							fillColor='#a8a29e'
							unFillColor='transparent'
							textComponent={<Text style={s`text-base ml-3`}>{itemElem.name}</Text>}
							iconStyle={s`text-gray-400 rounded-none`}
							innerIconStyle={s`border-2 rounded-none`}
							isChecked={typesUsersNum.includes(itemElem.id - 1)}
							onPress={(_) => {
								if(!typesUsersNum.includes(itemElem.id - 1)) {
									setTypesUsersNum((prevTypesUser) => [...prevTypesUser, itemElem.id - 1]);
								} else {
									setTypesUsersNum((prevTypesUser) => prevTypesUser.filter((item) => item !== itemElem.id - 1));
								}
							}}
						/>
					</View>
				)}
			</View>
		</View>
	)
}

export default InstitutionsFilter;