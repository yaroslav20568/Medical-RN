import React, { useCallback, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoBack, HeaderLogo, Loader } from '../../components';
import { libraryStore } from '../../mobx';
import { LibraryArticles } from '../../components';
import { RootStackParams } from '../../navigation/HomeStacks';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Library'> {}

const Library = observer(({ navigation }: IProps) => {
	useEffect(() => {
		libraryStore.loadArticles();
	}, []);

	const onHandleNavigation = useCallback((libraryArticleId: number, name: string): void => {
		navigation.navigate('LibraryContent', {libraryArticleId, name});
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
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Разделы библиотеки: </Text>
				{libraryStore.isLoadingArticles ?
					<Loader /> :
					<LibraryArticles 
						libraryArticles={libraryStore.articles}
						onHandleNavigation={onHandleNavigation}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default Library;