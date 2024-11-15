import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { s } from 'react-native-wind';
import axios from 'axios';
import { RootStackParams } from '../../navigation/HomeStacks';
import { GoBack, HeaderLogo } from '../../components';
import { siteUrl } from '../../constants';
import { questionsStore } from '../../mobx';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Question'> {}

const Question = ({ route, navigation }: IProps) => {
	const { userId, question } = route.params;
	const [activeRadio, setActiveRadio] = useState<number>(question?.answers[0]?.id);
	const [infoText, setInfoText] = useState<string>('');
	const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);

	const radioArray = question.answers.map(answer => ({label: answer.name, value: answer.id}));

	const answerQuestion = () => {
		setIsDisabledBtn(true);

		const sendObj = {
			questionId: question.id,
			questionAnswerId: activeRadio,
			userId: userId
		}

		axios<string>({
			url: `${siteUrl}/api/question-result`,
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: sendObj
		})
		.then((response) => {
			if(response.status === 200) {
				setInfoText(response.data);
				setTimeout(() => {
					setIsDisabledBtn(false);
					questionsStore.loadQuestions(userId);
					navigation.navigate('Questions');
				}, 1000);
			}
		})
	};

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
				<Text style={s`text-xl font-semibold text-black mb-4`}>{question.name}</Text>
				<RadioForm>
					{radioArray.map((radio, index) => (
						<RadioButton 
							labelHorizontal={true} 
							key={index} 
							style={s`mb-2`}
						>
							<RadioButtonInput
								obj={radio}
								index={index}
								isSelected={radio.value === activeRadio}
								onPress={(value) => setActiveRadio(value)}
								buttonSize={18}
								buttonOuterSize={30}
							/>
							<RadioButtonLabel
								obj={radio}
								index={index}
								labelHorizontal={true}
								onPress={(value) => setActiveRadio(value)}
								labelStyle={s`text-base text-black`}
							/>
						</RadioButton>
					))}  
				</RadioForm>
				{infoText && <View>
					<Text style={s`text-red-900 text-base`}>{infoText}</Text>
				</View>}
				<TouchableOpacity 
					style={[s`${isDisabledBtn ? 'bg-violet-500' : 'bg-violet-700'} rounded-lg flex-row items-center justify-center py-2 mt-2`]}
					onPress={answerQuestion}
					activeOpacity={.7}
					disabled={isDisabledBtn}
				>
					<Text style={s`text-white text-lg color-orange-900 mr-3`}>Ответить</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

export default Question;