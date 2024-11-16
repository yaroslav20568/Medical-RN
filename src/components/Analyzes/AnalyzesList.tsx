import React from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import { IAnalysis } from '../../types';
import { Loader } from '../../components';
import { siteUrl } from '../../constants';

interface IProps {
	analyzes: Array<IAnalysis>;
	loadMoreAnalyzes: () => void;
	isLoadingMore: boolean;
	showImageModal: () => void;
	setImageUrl: (imageUrl: string) => void;
}

const AnalyzesList = ({ analyzes, loadMoreAnalyzes, isLoadingMore, showImageModal, setImageUrl }: IProps) => {
	return (
		<View>
			{analyzes.length ? 
				<FlatList
					data={analyzes}
					renderItem={({item}) => 
						<Analysis 
							key={`analysis_${item.id}`} 
							analysis={item}
							showImageModal={showImageModal}
							setImageUrl={setImageUrl}
						/>
					}
					onEndReachedThreshold={0}
					onEndReached={loadMoreAnalyzes}
				/> : 
				<Text style={[s`text-lg font-semibold`]}>Анализы не найдены</Text>
			}
			{isLoadingMore && <View style={s`absolute w-full bottom-2`}><Loader /></View>}
		</View>
	)
}

interface IAnalysisProps {
	analysis: IAnalysis;
	showImageModal: () => void;
	setImageUrl: (imageUrl: string) => void;
}

const Analysis = ({ analysis, showImageModal, setImageUrl }: IAnalysisProps) => {
	const { name, category, photo, date } = analysis;
	
	return (
		<View style={s`bg-white rounded-2xl mb-4`}>
			<TouchableOpacity
				onPress={() => {
					showImageModal();
					setImageUrl(photo);
				}}
				activeOpacity={.7}
			>
				<Image
					source={{uri: `${siteUrl}/${photo}`}}
					style={[s`rounded-2xl`, {aspectRatio: 1.5}]}
				/>
			</TouchableOpacity>
			<View style={s`px-3 py-1`}>
				<Text style={s`text-lg font-medium text-black`}>Название: {name}</Text>
				<Text style={s`text-base font-medium text-black`}>Категория: {category}</Text>
				<Text style={s`text-base font-medium text-black`}>Сделано: {new Date(date).toLocaleString('ru', {timeZone: 'Europe/Moscow'})}</Text>
			</View>
		</View>
	);
}

export default AnalyzesList;