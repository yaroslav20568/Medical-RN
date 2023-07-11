import React, { useCallback, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { ArticlesItems, GoBack, HeaderLogo, Loader } from '../../components';
import { LibraryStore } from '../../mobx';
import { observer } from 'mobx-react-lite';
import { IArticles } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Articles'> {}

const Articles = observer(({ route, navigation }: IProps) => {
	useEffect(() => {
		LibraryStore.loadArticles(route.params.id);
	}, []);

	const onHandleNavigation = useCallback((item: IArticles) => {
		navigation.navigate('Article', {item})
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
					<ArticlesItems
						articles={LibraryStore.articles}
						onHandleNavigation={onHandleNavigation}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default Articles;