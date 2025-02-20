import React, { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { s } from 'react-native-wind';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ITab } from '../types';
import { CustomTab } from '../navigation';
import socket from '../socket/chat-socket';
import { chatStore, userStore } from '../mobx';
import { findPartnerId } from '../helpers';

interface IProps {
	state: TabNavigationState<ParamListBase>;
	navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
	tabItems: Array<ITab>;
}

const CustomTabs = ({ state, navigation, tabItems }: IProps) => {
	const { width } = useWindowDimensions();

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{translateX: withSpring(state.index * width / tabItems.length)}]
	}));
	
	const tabNavigate = useCallback((name: string, index: number): void => {
		if(state.index === 0) {
			navigation.navigate(name);
		}

		if(name === 'Chat') {
			if(userStore.userData?.role === 'User') {
				socket.emit('join-room', userStore.userData.id);

				if(chatStore.messages.filter(message => message.userId !== userStore.userData?.id && !message.isRead).length) {
					socket.emit('set-is-read-messages', findPartnerId(userStore.userData.id, chatStore.messages));
				}
			}
		} else {
			socket.emit('leave-room', userStore.userData?.id);
		}
	}, []);

	return (
		<View style={s`flex-row bg-warmGray-200`}>
			<Animated.View style={[s`absolute top-0 h-full`, {width: width / tabItems.length, backgroundColor: '#294CB4'}, animatedStyles]}></Animated.View>
			{tabItems.map((tabItem, index) => 
				<CustomTab 
					state={state} 
					tabItem={tabItem} 
					tabNavigate={tabNavigate} 
					index={index} 
					key={`tab_${index}`}
				/>
			)}
		</View>
	)
}

export default CustomTabs;