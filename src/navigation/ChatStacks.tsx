import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat, ChatDialog } from '../pages';
import { RootStackParams } from './HomeStacks';

const ChatStack = createNativeStackNavigator<RootStackParams>();

const ChatStacks = () => {
	return (
		<ChatStack.Navigator
			screenOptions={{headerShown: false}}
		>
			<ChatStack.Screen name="ChatInner" component={Chat} options={{animation: 'slide_from_right'}} />
			<ChatStack.Screen name="ChatDialog" component={ChatDialog} options={{animation: 'slide_from_right'}} />
		</ChatStack.Navigator>
	);
}

export default ChatStacks;