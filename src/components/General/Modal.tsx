import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { s } from 'react-native-wind';
import { IModalStyles } from '../../types';

interface IProps {
	children: React.ReactNode;
	animatedStyles: IModalStyles;
}

const Modal = ({ children, animatedStyles }: IProps) => {
	const { width, height } = useWindowDimensions();

	return (
		<Animated.View style={[s`justify-center absolute z-10 w-full h-full p-5 ${width > height ? 'items-center' : ''}`, {backgroundColor: 'rgba(0, 0, 0, .6)'}, animatedStyles]}>
			<View style={s`bg-white rounded-xl ${width > height ? 'w-3/4' : ''}`}>
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