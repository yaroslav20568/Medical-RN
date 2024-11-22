import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { observer } from 'mobx-react-lite';
import { LibraryItems, GoBack, HeaderLogo, Loader } from '../../components';
import { libraryStore } from '../../mobx';
import { ILibraryItem } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'LibraryContent'> {}

const LibraryContent = observer(({ route, navigation }: IProps) => {
	useEffect(() => {
		libraryStore.loadItems(route.params.libraryArticleId);
	}, []);
	
	const loadMoreItems = useCallback((): void => {
		libraryStore.loadMoreItems(route.params.libraryArticleId);
	}, []);

	const onHandleNavigation = useCallback((libraryItem: ILibraryItem): void => {
		navigation.navigate('LibraryItem', {libraryItem})
	}, []);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`pb-3`}
		>
			<HeaderLogo 
				logo={require('../../assets/images/vstrecha-logo.png')} 
			/>
			<GoBack 
				navigation={navigation} 
			/>
			<View style={s`mt-3 px-3`}>
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Статьи раздела {route.params.name}: </Text>
				{libraryStore.isLoadingItems ?
					<Loader /> :
					<LibraryItems
						libraryItems={libraryStore.items}
						onHandleNavigation={onHandleNavigation}
						loadMoreItems={loadMoreItems}
						isLoadingItemsMore={libraryStore.isLoadingItemsMore}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default LibraryContent;