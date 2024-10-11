import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { s } from 'react-native-wind';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ITab } from '../types';

interface IProps {
	state: TabNavigationState<ParamListBase>;
	tabItem: ITab;
	tabNavigate: (name: string, index: number) => void;
	index: number;
	moveSelectTab: (index: number) => void;
}

export const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

const CustomTab = ({ state, tabItem, tabNavigate, index, moveSelectTab }: IProps) => {
	const color = useSharedValue('#999');
	const scale = useSharedValue(1);

	useEffect(() => {
		if(state.index === index) {
			color.value = withSpring('#fff');
			scale.value = withTiming(1.3);
			moveSelectTab(index);
		} else {
			color.value = withSpring('#999');
			scale.value = withTiming(1);
			
		}
	}, [state.index]);

	return (
		<Pressable 
			style={[s`flex-1 items-center`]} 
			onPress={() => tabNavigate(tabItem.name, index)}
		>
			<AnimatedIcon 
				name={tabItem.icon} 
				size={25} 
				color={color} 
				style={[s`py-2`, {transform: [{ scale }]}]}
			/>
		</Pressable>
	)
}

export default CustomTab;