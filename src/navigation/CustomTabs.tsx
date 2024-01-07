import React, { useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { s } from 'react-native-wind';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { ITab } from '../types';
import { CustomTab } from '../navigation';

interface IProps {
	state: TabNavigationState<ParamListBase>;
	navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
	tabItems: Array<ITab>;
}

const CustomTabs = ({ state, navigation, tabItems }: IProps) => {
	const width = Dimensions.get('window').width;
	const translateX = useSharedValue(0);
	
	const tabNavigate = useCallback((name: string, index: number) => {
		if(state.index === 0) {
			navigation.navigate(name);
			translateX.value = withSpring(index * width / tabItems.length);
		}
	}, []);

	return (
		<View style={s`flex-row bg-warmGray-200`}>
			<Animated.View style={[s`absolute top-0 h-full`, {width: width / tabItems.length, transform: [{ translateX }], backgroundColor: '#294CB4'}]}></Animated.View>
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