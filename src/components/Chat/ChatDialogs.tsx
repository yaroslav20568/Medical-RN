import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import { IDialog, navigationType } from '../../types';
import { siteUrl } from '../../constants';
import { messageTimeDifference } from '../../helpers';
import socket from '../../socket/chat-socket';

interface IProps {
	dialogs: Array<IDialog>;
	userId: number | undefined;
	navigation: navigationType;
}

const ChatDialogs = ({ dialogs, userId, navigation }: IProps) => {
	return (
		<View style={s`mt-3 px-3 pb-20`}>
			{dialogs.length ?
				dialogs.map((dialog, index) => 
					<ChatDialog 
						dialog={dialog} 
						userId={userId}
						navigation={navigation}
						key={`message_${index}`}
					/>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Диалогов нет. Начните диалог, задайте интересующие вас вопросы</Text>
			}
		</View>
	)
}

interface IChatDialogProps {
	dialog: IDialog;
	userId: number | undefined;
	navigation: navigationType;
}

const ChatDialog = ({ dialog, userId, navigation }: IChatDialogProps) => {
	const navigateToChatDialog = () => {
		dialog.adminId === 0 && socket.emit('set-admin-dialog', {dialogId: dialog.id, adminId: userId});
		socket.emit('join-room', dialog.userId);
		navigation.navigate('ChatDialog', {dialogId: dialog.id, userId: dialog.userId, messages: dialog.messages});
	}

	return (
		<TouchableOpacity 
			style={s`flex-row items-center justify-between border-black border-b-2 border-gray-400 pb-2`}
			onPress={navigateToChatDialog}
			activeOpacity={.7}
		>
			<View style={s`flex-row items-center`}>
				<Image
					source={{uri: `${siteUrl}/${dialog.user.imageUrl}`}}
					style={s`w-16 h-16 rounded-full mr-3`}
					resizeMode='cover'
				/>
				<View style={{width: '70%'}}>
					<Text style={s`text-black text-base mb-1`}>{dialog.user.email}</Text>
					<Text numberOfLines={1} ellipsizeMode='tail'>{dialog.messages[dialog.messages.length - 1].text}</Text>
				</View>
			</View>
			<View style={s`items-end`}>
				<Text style={s`mb-2`}>{messageTimeDifference(dialog.messages[dialog.messages.length - 1].time)}</Text>
				{dialog.messages[dialog.messages.length - 1].userId === userId ?
					dialog.messages.filter(item => item.userId === userId && !item.isRead).length && 
						<View style={s`w-3 h-3 bg-gray-400 rounded-full`}></View> : 
					dialog.messages.filter(item => item.userId !== userId && !item.isRead).length && 
						<View style={s`w-6 h-6 items-center justify-center bg-blue-500 rounded-full`}>
							<Text style={s`text-white`}>{dialog.messages.filter(item => item.userId !== userId && !item.isRead).length}</Text>
						</View>}
			</View>
		</TouchableOpacity>
	)
}

export default ChatDialogs;