import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import { IInstitutionRB } from '../../types';

interface IProps {
	institutions: Array<IInstitutionRB>;
}

const InstitutionList = ({ institutions }: IProps) => {
	return (
		<View style={s`px-3`}>
			{institutions.length ? 
				institutions.map((institution) => 
					<InstitutionItem 
						key={`institution_${institution.id}`} 
						{...institution} 
					/>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Institutions not found</Text>
			}
		</View>
	)
}

const InstitutionItem = ({ name, photo }: IInstitutionRB) => {
	return (
		<TouchableOpacity 
			style={s`flex-row items-center bg-white rounded-2xl overflow-hidden mb-4`}
			activeOpacity={.7}
		>
			<Image
				source={{uri: photo}}
				style={{width: '40%', height: 130}}
			/>
			<Text style={[{width: '60%'}, s`text-base font-medium px-2`]}>{name}</Text>
		</TouchableOpacity>
	);
}

export default InstitutionList;