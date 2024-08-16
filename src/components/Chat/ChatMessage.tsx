import React from 'react';
import { View, Text, Image } from 'react-native';
import { s } from 'react-native-wind';
import { IMessage } from '../../types';
import { siteUrl } from '../../constants';

interface IProps {
	message: IMessage;
	userId: number | undefined;
}

const ChatMessage = ({ message, userId }: IProps) => {
	return (
		<View style={s`flex-row items-center justify-between`}>
			{message.user.id === userId ? 
				<>
					<View style={s`w-5/6`}>
						<Text style={s`text-xs mb-1 ml-3`}>{message.time}</Text>
						<View style={s`bg-blue-500 rounded-2xl py-4 px-3`}>
							<Text style={s`text-white`}>{message.text}</Text>
						</View>
					</View>
					<View style={s`w-12`}>
						<Image
							source={{uri: `${siteUrl}/${message.user.imageUrl}`}}
							style={[s`h-12 rounded-full`]}
							resizeMode='cover'
						/>
					</View>
				</> : 
				<>
					<View style={s`w-12`}>
						<Image
							source={{uri: `${siteUrl}/${message.user.imageUrl}`}}
							style={[s`h-12 rounded-full`]}
							resizeMode='cover'
						/>
					</View>
					<View style={s`w-5/6`}>
						<Text style={s`text-xs mb-1 ml-3`}>{message.time}</Text>
						<View style={s`bg-warmGray-200 rounded-2xl py-4 px-3`}>
							<Text>{message.text}</Text>
						</View>
					</View>
				</>}
		</View>
	)
}

export default ChatMessage;