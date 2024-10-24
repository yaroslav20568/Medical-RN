import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { s } from 'react-native-wind';

interface IProps {
	children: React.ReactNode;
	translateX: Animated.AnimatedInterpolation<string | number>;
	animatedValue: Animated.Value;
}

const Modal = ({ children, translateX, animatedValue }: IProps) => {
	return (
		<Animated.View style={[s`absolute z-10 w-full h-full px-5 py-10`, {backgroundColor: 'rgba(0, 0, 0, .6)', opacity: animatedValue, transform: [{translateX: translateX}]}]}>
			<View style={s`bg-white rounded-xl`}>
				<ScrollView
					showsVerticalScrollIndicator={false}
				>
					<View style={s`px-3 py-5`}>{children}</View>
				</ScrollView>
			</View>
		</Animated.View>
	)
}

export default Modal;