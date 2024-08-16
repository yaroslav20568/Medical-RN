import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
	onPress: (value: string, setMessage: (value: string) => void) => void;
}

const ChatForm = ({ onPress }: IProps) => {
	const [message, setMessage] = useState('');

	return (
		<View style={s`w-full absolute bottom-5 px-3`}>
			<View style={s`bg-warmGray-200 border-warmGray-300 border-2 rounded-2xl`}>
				<TextInput 
					value={message}
					onChangeText={(text) => setMessage(text)}
					style={s`px-5 text-base`} 
					placeholder='Напишите что вас интересует'
				/>
				<TouchableOpacity
					onPress={() => onPress(message, setMessage)}
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