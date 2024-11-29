import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
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
		<>
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
		</>
	)
}

interface IAnalysisProps {
	analysis: IAnalysis;
	showImageModal: () => void;
	setImageUrl: (imageUrl: string) => void;
}

const Analysis = ({ analysis, showImageModal, setImageUrl }: IAnalysisProps) => {
	const { name, category, photo, date } = analysis;
	const { width, height } = useWindowDimensions();

	const showModal = () => {
		showImageModal();
		setImageUrl(photo);
	};
	
	return (
		<View style={s`bg-white rounded-2xl mb-4 ${width > height ? 'flex-row' : ''}`}>
			<TouchableOpacity
				onPress={showModal}
				style={s`${width > height ? 'w-1/2' : ''}`}
				activeOpacity={.7}
			>
				<Image
					source={{uri: `${siteUrl}/${photo}`}}
					style={[s`w-full rounded-2xl`, {aspectRatio: 1.5}]}
				/>
			</TouchableOpacity>
			<View style={s`px-3 py-1 ${width > height ? 'w-1/2 justify-center' : ''}`}>
				<Text style={s`text-lg font-medium text-black`}>Название: {name}</Text>
				<Text style={s`text-base font-medium text-black`}>Категория: {category}</Text>
				<Text style={s`text-base font-medium text-black`}>Сделано: {new Date(date).toLocaleString('ru', {timeZone: 'Europe/Moscow'})}</Text>
			</View>
		</View>
	);
}

export default AnalyzesList;