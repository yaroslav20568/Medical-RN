import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import RenderHtml from 'react-native-render-html';
import { RootStackParams } from '../../navigation/HomeStacks';
import { GoBack, HeaderLogo } from '../../components';

interface IProps extends NativeStackScreenProps<RootStackParams, 'LibraryItem'> {}

const LibraryItem = ({ route, navigation }: IProps) => {
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
				<Text style={s`text-xl font-semibold text-black mb-4`}>{route.params.item.title}</Text>
				<RenderHtml
					contentWidth={300}
					source={{html: route.params.item.text}}
				/>
			</View>
		</ScrollView>
	)
}

export default LibraryItem;