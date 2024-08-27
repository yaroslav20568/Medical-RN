import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { observer } from 'mobx-react-lite';
import { ChatDialogs, ChatForm, ChatMessages, GoBack, HeaderLogo } from '../../components';
import socket from '../../socket/chat-socket';
import { chatStore, userStore } from '../../mobx';
import { IMessage } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'ChatInner'> {}

const Chat = observer(({ navigation }: IProps) => {
	const scrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		const returnMessage = (message: IMessage) => {
			chatStore.addNewMessage(message);
		};

		socket.on('return-message', returnMessage);

		return () => {
			socket.off('return-message', returnMessage);
		}
	}, []);

	const sendMessage = (message: string, setMessage: (message: string) => void) => {
		setMessage('');
		socket.emit('send-message', {
			time: new Date(),
			text: message,
			userId: userStore.userData?.id,
			user: userStore.userData
		});
	}

	const leaveRoomUser = () => {
		if(userStore.userData?.role === 'User') {
			socket.emit('leave-room', userStore.userData?.id);
		}
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
					onPress={leaveRoomUser}
				/>
				{userStore.userData?.role === 'User' ?
					<ChatMessages 
						messages={chatStore.messages}
						userId={userStore.userData?.id}
					/> : 
					<ChatDialogs 
						dialogs={chatStore.dialogs} 
						userId={userStore.userData?.id}
						navigation={navigation}
					/>
				}
			</ScrollView>
			{userStore.userData?.role === 'User' &&
				<ChatForm onPress={sendMessage} />
			}
		</>
	)
})

export default Chat;