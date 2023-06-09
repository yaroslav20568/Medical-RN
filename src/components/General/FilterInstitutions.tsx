import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ISelectItem } from '../../types/index';

interface IProps {
	cities: Array<ISelectItem>;
	cityId: number | '';
	setCityId: (value: number) => void;
	typesInstitution: Array<ISelectItem>;
	typeInstitutionId: number | '';
	setTypeInstitutionId: (value: number) => void;
}

const FilterInstitutions = ({ cities, cityId, setCityId, typesInstitution, typeInstitutionId, setTypeInstitutionId }: IProps) => {
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
		</View>
	)
}

export default FilterInstitutions;