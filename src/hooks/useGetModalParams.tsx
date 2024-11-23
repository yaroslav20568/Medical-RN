import { useCallback, useRef } from "react";
import { Animated, useWindowDimensions } from "react-native";

type typeModalParams = [Animated.Value, Animated.AnimatedInterpolation<string | number>, () => void, () => void];

const useGetModalParams = (): typeModalParams => {
	const { width } = useWindowDimensions();

	const animatedValue = useRef(new Animated.Value(0)).current;

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-width, 0]
	})

	const showModal = useCallback((): void => {
		Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
	}, []);

	const hideModal = useCallback((): void => {
		Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
	}, []);

	return [animatedValue, translateX, showModal, hideModal];
}

export default useGetModalParams;