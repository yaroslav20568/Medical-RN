import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { s } from 'react-native-wind';
import Animated from 'react-native-reanimated';
import { IInstitution, navigationType } from '../../types';
import { Loader } from '../../components';
import { siteUrl } from '../../constants';

interface IProps {
	institutions: Array<IInstitution>;
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
					renderItem={({item}) => 
						<InstitutionItem 
							key={`institution_${item.id}`} 
							institution={item} 
							navigation={navigation}
						/>
					}
					onEndReachedThreshold={0}
					onEndReached={loadMoreInstitutions}
				/> : 
				<Text style={[s`text-lg font-semibold`]}>Учреждения не найдены</Text>
			}
			{isLoadingMore && <View style={s`absolute w-full bottom-2`}><Loader /></View>}
		</View>
	)
}

interface IInstitutionItemProps {
	institution: IInstitution;
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
			<Animated.Image
				source={{uri: `${siteUrl}/${photo}`}}
				style={[s`rounded-2xl`, {width: '40%', height: 130}]}
				sharedTransitionTag={`tag_${institution.id}`}
			/>
			<Text style={[{width: '60%'}, s`text-base font-medium text-black px-2`]}>{name}</Text>
		</TouchableOpacity>
	);
}

export default InstitutionList;