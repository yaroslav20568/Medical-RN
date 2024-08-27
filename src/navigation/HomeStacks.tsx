import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Institutions, Institution, Library, LibraryContent, LibraryItem } from '../pages';
import { IInstitutionRB, ILibraryItem, IMessage } from '../types';

export type RootStackParams = {
  HomeInner: undefined;
  Institutions: undefined;
	Institution: {
		institution: IInstitutionRB;
	};
	Library: undefined;
	LibraryContent: {
		id: number;
		name: string;
	};
	LibraryItem: {
		item: ILibraryItem;
	};
	Account: undefined;
	ChatInner: undefined;
	ChatDialog: {
		dialogId: number;
		userId: number;
		messages: Array<IMessage>;
	};
};

const HomeStack = createNativeStackNavigator<RootStackParams>();

const HomeStacks = () => {
	return (
		<HomeStack.Navigator
			screenOptions={{headerShown: false}}
		>
			<HomeStack.Screen name="HomeInner" component={Home} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Institutions" component={Institutions} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Institution" component={Institution} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Library" component={Library} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="LibraryContent" component={LibraryContent} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="LibraryItem" component={LibraryItem} options={{animation: 'slide_from_right'}} />
		</HomeStack.Navigator>
	);
}

export default HomeStacks;