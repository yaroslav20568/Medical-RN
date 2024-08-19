import React from 'react';
import { Text, View } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import ChatMessage from './ChatMessage';
import { IMessage } from '../../types';

interface IProps {
	messages: Array<IMessage>;
	userId: number | undefined;
}

const ChatMessages = observer(({ messages, userId }: IProps) => {
	return (
		<View style={s`px-3 pt-4 pb-20`}>
			{messages.length ?
				messages.map((message, index) => 
					<ChatMessage 
						message={message} 
						userId={userId} 
						key={`message_${index}`}
					/>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Сообщений нет. Начните диалог, задайте интересующие вас вопросы</Text>
			}
		</View>
	)
})

export default ChatMessages;