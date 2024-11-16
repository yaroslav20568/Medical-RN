import React from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { s } from 'react-native-wind';

interface IProps {
	translateX: Animated.AnimatedInterpolation<string | number>;
	animatedValue: Animated.Value;
	hideModal: () => void;
	onPress: () => void;
	message: string;
}

const ConfirmModal = ({ translateX, animatedValue, hideModal, onPress, message }: IProps) => {
	return (
		<Animated.View style={[s`justify-center absolute z-10 w-full h-full px-5 py-10`, {backgroundColor: 'rgba(0, 0, 0, .6)', opacity: animatedValue, transform: [{translateX: translateX}]}]}>
			<View style={s`bg-white rounded-xl px-3 py-5`}>
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