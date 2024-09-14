import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Institutions, Institution, Library, LibraryContent, LibraryItem, QuickHelp, Questions, Question, HelpAbroads } from '../pages';
import { IInstitution, ILibraryItem, IMessage, IQuestion } from '../types';

export type RootStackParams = {
  HomeInner: undefined;
  Institutions: undefined;
	Institution: {
		institution: IInstitution;
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
	QuickHelp: undefined;
	Questions: undefined;
	Question: {
		userId: number | undefined;
		question: IQuestion;
	};
	HelpAbroads: undefined;
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
			<HomeStack.Screen name="QuickHelp" component={QuickHelp} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Questions" component={Questions} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Question" component={Question} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="HelpAbroads" component={HelpAbroads} options={{animation: 'slide_from_right'}} />
		</HomeStack.Navigator>
	);
}

export default HomeStacks;