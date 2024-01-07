import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Institutions, Institution, Library, Articles, Article } from '../pages';
import { IInstitutionRB, IArticles } from '../types';

export type RootStackParams = {
  HomeInner: undefined;
  Institutions: undefined;
	Institution: {
		institution: IInstitutionRB;
	};
	Library: undefined;
	Articles: {
		id: number;
		name: string;
	};
	Article: {
		item: IArticles;
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
			<HomeStack.Screen name="Articles" component={Articles} options={{animation: 'slide_from_right'}} />
			<HomeStack.Screen name="Article" component={Article} options={{animation: 'slide_from_right'}} />
		</HomeStack.Navigator>
	);
}

export default HomeStacks;