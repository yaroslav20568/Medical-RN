import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
	onPress: (message: string) => void;
}

const ChatForm = ({ onPress }: IProps) => {
	const [message, setMessage] = useState('');

	const setStateValue = (text: string): void => {
		setMessage(text);
	};

	const onSendMessage = (): void => {
		setMessage('');
		onPress(message);
	};

	return (
		<View style={s`w-full absolute bottom-5 px-3`}>
			<View style={s`bg-warmGray-200 border-warmGray-300 border-2 rounded-2xl`}>
				<TextInput 
					value={message}
					onChangeText={setStateValue}
					style={s`text-base pl-5 pr-20`} 
					placeholder='Напишите что вас интересует'
				/>
				<TouchableOpacity
					onPress={onSendMessage}
					style={[s`absolute right-3 top-1 w-10 h-10 bg-blue-600 items-center justify-center rounded-full`]}
					activeOpacity={.7}
					disabled={message ? false : true}
				>
					<Ionicons name='send' size={18} color='#fff' />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ChatForm;