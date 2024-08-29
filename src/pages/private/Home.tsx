import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from "react-native-wind";
import { HeaderLogo, MenuList } from '../../components';
import socket from '../../socket/chat-socket';
import { chatStore, userStore } from '../../mobx';
import { IDialog, IMessage } from '../../types';
import { RootStackParams } from '../../navigation/HomeStacks';

interface IProps extends NativeStackScreenProps<RootStackParams, 'HomeInner'> {}

const Home = ({ navigation }: IProps) => {
	useEffect(() => {
		const returnMessagesUser = (messages: Array<IMessage>) => {
			chatStore.setMessages(messages);
		}
		const returnDialogsAdmin = (dialogs: Array<IDialog>) => {
			chatStore.setDialogs(dialogs);
		}

		if(userStore.userData?.role === 'User') {
			socket.emit('get-messages-user', userStore.userData.id);
			socket.on('return-messages-user', returnMessagesUser);
		} else {
			socket.emit('get-dialogs-admin');
			socket.on('return-dialogs-admin', returnDialogsAdmin);
		}

		return () => {
			if(userStore.userData?.role === 'User') {
				socket.off('return-messages-user', returnMessagesUser);
			} else {
				socket.off('return-dialogs-admin', returnDialogsAdmin);
			}
		}
	}, []);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`pb-3`}
		>
			<HeaderLogo 
				logo={require('../../assets/images/vstrecha-logo.png')} 
			/>
			<MenuList
				navigation={navigation}
			/>
		</ScrollView>
	)
}

export default Home;