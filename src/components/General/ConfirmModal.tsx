import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { s } from 'react-native-wind';
import { IModalStyles } from '../../types';

interface IProps {
	animatedStyles: IModalStyles;
	hideModal: () => void;
	onPress: () => void;
	message: string;
}

const ConfirmModal = ({ animatedStyles, hideModal, onPress, message }: IProps) => {
	const { width, height } = useWindowDimensions();

	return (
		<Animated.View style={[s`justify-center absolute z-10 w-full h-full p-5 ${width > height ? 'items-center' : ''}`, {backgroundColor: 'rgba(0, 0, 0, .6)'}, animatedStyles]}>
			<View style={s`bg-white rounded-xl px-3 py-5 ${width > height ? 'w-2/4' : ''}`}>
				<ScrollView
					showsVerticalScrollIndicator={false}
				>
					<View style={s`flex-row items-center justify-between mb-3`}>
						<Text style={s`text-xl font-medium`}>Подтвердите действие</Text>
						<View style={s`flex-row`}>
							<TouchableOpacity
								onPress={() => hideModal()}
								activeOpacity={.7}
							>
								<AntDesign name='closecircleo' size={30} />
							</TouchableOpacity>
						</View>
					</View>
					<Text style={s`text-base mb-2`}>{message}</Text>
					<View style={s`flex-row justify-between`}>
						<TouchableOpacity 
							style={[{width: '47%'}, s`bg-orange-400 rounded-lg flex-row items-center justify-center py-2`]}
							onPress={onPress}
							activeOpacity={.7}
						>
							<Text style={s`text-white text-lg color-orange-900 mr-3`}>Да</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={[{width: '47%'}, s`bg-violet-700 rounded-lg flex-row items-center justify-center py-2`]}
							onPress={hideModal}
							activeOpacity={.7}
						>
							<Text style={s`text-white text-lg color-orange-900 mr-3`}>Нет</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</Animated.View>
	)
}

export default ConfirmModal;