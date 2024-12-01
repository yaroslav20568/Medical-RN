import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { RootStackParams } from '../../navigation/HomeStacks';
import { ChatForm, ChatMessages, GoBack, HeaderLogo } from '../../components';
import { chatStore, userStore } from '../../mobx';
import socket from '../../socket/chat-socket';

interface IProps extends NativeStackScreenProps<RootStackParams, 'ChatDialog'> {}

const ChatDialog = observer(({ route, navigation }: IProps) => {
	const { dialogId, userId, messages } = route.params;

	const scrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		chatStore.setMessages(messages);
	}, [messages]);

	const sendMessage = (message: string): void => {
		socket.emit('send-message', {
			time: new Date(),
			text: message,
			userId: userStore.userData?.id,
			user: userStore.userData,
			dialogId: dialogId
		});
	}

	const leaveRoomAdmin = (): void => {
		socket.emit('leave-room', userId);
	}

	const scrollToDown = (): void => {
		scrollViewRef.current?.scrollToEnd();
	};

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={s`pb-3`}
				ref={scrollViewRef}
				onContentSizeChange={scrollToDown}
			>
				<HeaderLogo 
					logo={require('../../assets/images/vstrecha-logo.png')} 
				/>
				<GoBack 
					navigation={navigation} 
					onPress={leaveRoomAdmin}
				/>
				<ChatMessages 
					messages={chatStore.messages}
					userId={userStore.userData?.id}
				/>
			</ScrollView>
			<ChatForm onPress={sendMessage} />
		</>
	)
})

export default ChatDialog;