import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { s } from "react-native-wind";
import { HeaderLogo, MenuList } from '../../components';
import socket from '../../socket/chat-socket';
import { chatStore, userStore } from '../../mobx';
import { IMessage } from '../../types';

interface IProps {
	navigation: NavigationProp<ParamListBase>;
}

const Home = ({ navigation }: IProps) => {
	useEffect(() => {
		socket.emit('join-room', userStore.userData?.id);
		if(userStore.userData?.role === 'User') {
			socket.emit('get-messages', userStore.userData.id);
			socket.on('return-messages', (messages: Array<IMessage>) => {
				chatStore.setMessages(messages);
			});
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