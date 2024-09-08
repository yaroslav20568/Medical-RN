import React from 'react';
import { View, Text } from 'react-native';
import { IQuestionWithResult } from '../../types';
import { s } from 'react-native-wind';

interface IProps {
	questionsWithResults: Array<IQuestionWithResult>;
}

const QuestionResultList = ({ questionsWithResults }: IProps) => {
	return (
		<>
			{questionsWithResults.length ? 
				questionsWithResults.map((questionWithResult, index) => 
					<View 
						style={s`bg-white rounded-xl px-3 py-3 mb-4`}
						key={`questionWithResult_${index}`}
					>
						<Text style={s`text-base text-black`}>{questionWithResult.name}</Text>
						<View style={s`h-0.5 bg-gray-200 my-1`}></View>
						{questionWithResult.answers.map((answer, i) => 
							<Text style={s`text-base text-black`} key={`answer_${i}`}>
								{answer.name} - {questionWithResult.questionResults.filter(questionResult => questionResult.questionAnswerId === answer.id).length}
							</Text>
						)}
						<Text style={s`text-base text-black`}>Всего проголосовало - {questionWithResult.questionResults.length}</Text>
					</View>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Вопросы не найдены</Text>}
		</>
	)
}

export default QuestionResultList;