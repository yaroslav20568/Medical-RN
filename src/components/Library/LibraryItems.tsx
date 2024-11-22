import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { s } from 'react-native-wind';
import { ILibraryItem } from '../../types';
import Loader from '../General/Loader';

interface IProps {
	libraryItems: Array<ILibraryItem>;
	onHandleNavigation: (libraryItem: ILibraryItem) => void;
	loadMoreItems: () => void;
	isLoadingItemsMore: boolean;
}

const LibraryItems = ({ libraryItems, onHandleNavigation, loadMoreItems, isLoadingItemsMore }: IProps) => {
	return (
		<>
			{libraryItems.length ? 
				<FlatList
					data={libraryItems}
					renderItem={({item, index}) => 
						<LibraryItem 
							key={`libraryItem_${index}`} 
							libraryItem={item} 
							onHandleNavigation={onHandleNavigation}
							index={index}
						/>
					}
					onEndReachedThreshold={0}
					onEndReached={loadMoreItems}
				/> : 
				<Text style={[s`text-lg font-semibold`]}>Статьи не найдены</Text>
			}
			{isLoadingItemsMore && <View style={s`absolute w-full bottom-2`}><Loader /></View>}
		</>
	)
}

interface ILibraryItemProps {
	libraryItem: ILibraryItem;
	onHandleNavigation: (libraryItem: ILibraryItem) => void;
	index: number;
}

const LibraryItem = ({ libraryItem, onHandleNavigation, index }: ILibraryItemProps) => {
	return (
		<TouchableOpacity 
			style={s`mb-4`}
			activeOpacity={.7}
			onPress={() => onHandleNavigation(libraryItem)}
		>
			<Text style={s`mb-3 text-xl text-black`}>{index + 1}. {libraryItem.title}</Text>
			<RenderHtml
				contentWidth={300}
				source={{html: '<img' + libraryItem.text.match(/<img(.+?)\>/)![1] + '/>'}}
			/>
		</TouchableOpacity>
	);
}

export default LibraryItems;