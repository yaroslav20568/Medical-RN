import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { IQuestion } from '../../types';

interface IProps {
	questions: Array<IQuestion>;
	onHandleNavigation: (question: IQuestion) => void;
}

const QuestionList = observer(({ questions, onHandleNavigation }: IProps) => {
	return (
		<>
			{questions.length ? 
				questions.map((item, index) => 
					<TouchableOpacity 
						style={s`bg-white rounded-xl px-3 py-3 mb-4`}
						onPress={() => onHandleNavigation(item)}
						activeOpacity={.7}
						key={`question_${index}`}
					>
						<Text style={s`text-base text-black`}>{item.name}</Text>
					</TouchableOpacity>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Вопросы не найдены</Text>}
		</>
	)
})

export default QuestionList;