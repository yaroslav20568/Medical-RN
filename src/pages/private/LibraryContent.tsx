import React, { useCallback, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { observer } from 'mobx-react-lite';
import { LibraryItems, GoBack, HeaderLogo, Loader } from '../../components';
import { LibraryStore } from '../../mobx';
import { ILibraryItem } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'LibraryContent'> {}

const LibraryContent = observer(({ route, navigation }: IProps) => {
	useEffect(() => {
		LibraryStore.loadItems(route.params.id);
	}, []);

	const onHandleNavigation = useCallback((item: ILibraryItem) => {
		navigation.navigate('LibraryItem', {item})
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
			<View style={s`mt-6 px-3`}>
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Статьи раздела {route.params.name}: </Text>
				{LibraryStore.isLoadingArticles ?
					<Loader /> :
					<LibraryItems
						articles={LibraryStore.items}
						onHandleNavigation={onHandleNavigation}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default LibraryContent;