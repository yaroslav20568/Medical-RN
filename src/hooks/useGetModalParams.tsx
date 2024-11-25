import { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolation } from "react-native-reanimated";
import { IModalStyles } from "../types";

type typeModalParams = [IModalStyles, () => void, () => void];

const useGetModalParams = (): typeModalParams => {
	const { width } = useWindowDimensions();

	const animatedValue = useSharedValue<number>(0);

	const animatedStyles = useAnimatedStyle<IModalStyles>(() => ({
		opacity: animatedValue.value,
		transform: [{translateX: interpolate(animatedValue.value, [0, 1], [-width, 0], Extrapolation.CLAMP)}]
	}));

	const showModal = useCallback((): void => {
		animatedValue.value = withTiming(1, {duration: 500});
	}, []);

	const hideModal = useCallback((): void => {
		animatedValue.value = withTiming(0, {duration: 500});
	}, []);

	return [animatedStyles, showModal, hideModal];
}

export default useGetModalParams;