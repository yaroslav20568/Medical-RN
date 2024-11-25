import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { s } from 'react-native-wind';
import { IModalStyles } from '../../types';

interface IProps {
	children: React.ReactNode;
	animatedStyles: IModalStyles;
}

const Modal = ({ children, animatedStyles }: IProps) => {
	return (
		<Animated.View style={[s`justify-center absolute z-10 w-full h-full px-5 py-10`, {backgroundColor: 'rgba(0, 0, 0, .6)'}, animatedStyles]}>
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