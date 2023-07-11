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
			<HomeStack.Screen name="HomeInner" component={Home} />
			<HomeStack.Screen name="Institutions" component={Institutions} />
			<HomeStack.Screen name="Institution" component={Institution} />
			<HomeStack.Screen name="Library" component={Library} />
			<HomeStack.Screen name="Articles" component={Articles} />
			<HomeStack.Screen name="Article" component={Article} />
		</HomeStack.Navigator>
	);
}

export default HomeStacks;