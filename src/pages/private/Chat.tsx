import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { observer } from 'mobx-react-lite';
import { ChatForm, ChatMessages, GoBack, HeaderLogo } from '../../components';
import socket from '../../socket/chat-socket';
import { chatStore, userStore } from '../../mobx';
import { IMessage } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Account'> {}

const Chat = observer(({ navigation }: IProps) => {
	const scrollViewRef = useRef<ScrollView>(null);

	const sendMessage = (message: string, setMessage: (message: string) => void) => {
		setMessage('');
		socket.emit('send-message', {
			time: new Date().toLocaleString('ru', {timeZone: 'Europe/Moscow'}),
			text: message,
			userId: userStore.userData?.id,
			user: userStore.userData
		});
		socket.on('return-message', (message: IMessage) => {
			chatStore.addNewMessage(message);
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
						messages={chatStore.messages}
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
})

export default Chat;