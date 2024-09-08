import React, { useCallback, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoBack, HeaderLogo, Loader, QuestionList } from '../../components';
import { questionsStore, userStore } from '../../mobx';
import { RootStackParams } from '../../navigation/HomeStacks';
import { IQuestion } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Questions'> {}

const Questions = observer(({ navigation }: IProps) => {
	useEffect(() => {
		questionsStore.loadQuestions(userStore.userData?.id);
	}, []);

	const onHandleNavigation = useCallback((question: IQuestion): void => {
		navigation.navigate('Question', {userId: userStore.userData?.id, question});
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
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Вопросы: </Text>
				{questionsStore.isLoading ?
					<Loader /> :
					<QuestionList 
						questions={questionsStore.questions}
						onHandleNavigation={onHandleNavigation}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default Questions;