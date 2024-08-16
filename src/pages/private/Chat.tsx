import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { ChatForm, ChatMessages, GoBack, HeaderLogo } from '../../components';
import socket from '../../socket/chat-socket';
import { userStore } from '../../mobx';
import { IMessage } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Account'> {}

const Chat = ({ navigation }: IProps) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const [messages, setMessages] = useState<Array<IMessage>>([]);

	useEffect(() => {
		socket.emit('join-room', userStore.userData?.id);
		if(userStore.userData?.role === 'User') {
			socket.emit('get-messages', userStore.userData.id);
			socket.on('return-messages', (messages: Array<IMessage>) => {
				setMessages(messages);
			});
		}
	}, []);

	const sendMessage = (message: string, setMessage: (message: string) => void) => {
		setMessage('');
		socket.emit('send-message', {
			time: new Date().toLocaleString('ru', {timeZone: 'Europe/Moscow'}),
			text: message,
			userId: userStore.userData?.id,
			user: userStore.userData
		});
		socket.on('return-messages', (message: IMessage) => {
			setMessages([...messages, message]);
		});
	}

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={s`pb-3`}
				ref={scrollViewRef}
				onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
			>
				<HeaderLogo 
					logo={require('../../assets/images/vstrecha-logo.png')} 
				/>
				<GoBack 
					navigation={navigation} 
				/>
				{userStore.userData?.role === 'User' ?
					<ChatMessages 
						messages={messages}
						userId={userStore.userData?.id}
					/> : 
					''
				}
			</ScrollView>
			{userStore.userData?.role === 'User' &&
				<ChatForm onPress={sendMessage} />
			}
		</>
	)
}

export default Chat;