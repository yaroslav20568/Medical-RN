import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface ISelectItem {
	label: string;
	value: number;
}

interface IProps {
	cities: Array<ISelectItem>;
	cityId: number | '';
	setCityId: (value: number) => void;
}

const FilterInstitutions = ({ cities, cityId, setCityId }: IProps) => {
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
		</View>
	)
}

export default FilterInstitutions;