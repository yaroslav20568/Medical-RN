import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { s } from 'react-native-wind';
import { IInstitutionRB, navigationType } from '../../types';
import Loader from './Loader';

interface IProps {
	institutions: Array<IInstitutionRB>;
	loadMoreInstitutions: () => void;
	isLoadingMore: boolean;
	navigation: navigationType;
}

const InstitutionList = ({ institutions, loadMoreInstitutions, isLoadingMore, navigation }: IProps) => {
	return (
		<View style={s`px-3`}>
			{institutions.length ? 
				<FlatList
					data={institutions}
					renderItem={({ item }) => 
						<InstitutionItem 
							key={`institution_${item.id}`} 
							institution={item} 
							navigation={navigation}
						/>
					}
					onEndReachedThreshold={0}
					onEndReached={loadMoreInstitutions}
				/> : 
				<Text style={[s`text-lg font-semibold`]}>Institutions not found</Text>
			}
			{isLoadingMore && <View style={s`absolute w-full bottom-2`}><Loader /></View>}
		</View>
	)
}

interface IInstitutionItemProps {
	institution: IInstitutionRB;
	navigation: navigationType;
}

const InstitutionItem = ({ institution, navigation }: IInstitutionItemProps) => {
	const { name, photo } = institution;
	
	return (
		<TouchableOpacity 
			style={s`flex-row items-center bg-white rounded-2xl overflow-hidden mb-4`}
			activeOpacity={.7}
			onPress={() => navigation.navigate('Institution', {institution})}
		>
			<Image
				source={{uri: photo}}
				style={{width: '40%', height: 130}}
			/>
			<Text style={[{width: '60%'}, s`text-base font-medium text-black px-2`]}>{name}</Text>
		</TouchableOpacity>
	);
}

export default InstitutionList;