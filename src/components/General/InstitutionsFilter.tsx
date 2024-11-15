import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { s } from 'react-native-wind';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ISelectItem, ITypeUser } from '../../types/index';

type callbackSetTypesUser = (typesUsersNum: Array<number>) => Array<number>;

interface IProps {
	cities: Array<ISelectItem>;
	cityId: number | '';
	setCityId: (cityId: number) => void;
	typesInstitution: Array<ISelectItem>;
	typeInstitutionId: number | '';
	setTypeInstitutionId: (typeInstitutionId: number) => void;
	typesUsers: Array<ITypeUser>;
	typesUsersNum: Array<number>;
	setTypesUsersNum: (callback: callbackSetTypesUser) => void;
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
				{typesUsers.map((typeUser, index) => 
					<View 
						style={s`flex-row items-center`}
						key={`typeUser_${index}`}
					>
						<BouncyCheckbox
							size={20}
							fillColor='#a8a29e'
							unFillColor='transparent'
							textComponent={<Text style={s`text-base ml-3`}>{typeUser.name}</Text>}
							iconStyle={s`text-gray-400 rounded-none`}
							innerIconStyle={s`border-2 rounded-none`}
							isChecked={typesUsersNum.includes(typeUser.id - 1)}
							onPress={(_) => {
								if(!typesUsersNum.includes(typeUser.id - 1)) {
									setTypesUsersNum((prevTypesUser) => [...prevTypesUser, typeUser.id - 1]);
								} else {
									setTypesUsersNum((prevTypesUser) => prevTypesUser.filter((prevTypeUser) => prevTypeUser !== typeUser.id - 1));
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