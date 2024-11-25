import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { s } from 'react-native-wind';
import { siteUrl } from '../../constants';

interface IProps {
	imageUrl: string;
}

const ZoomImage = ({ imageUrl }: IProps) => {
	const { width, height } = useWindowDimensions();

  const scale = useSharedValue<number>(1);
  const startScale = useSharedValue<number>(0);

	function clamp(val: number, min: number, max: number) {
		return Math.min(Math.max(val, min), max);
	}

  const pinch = Gesture.Pinch()
    .onStart(() => {
			startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
				startScale.value * event.scale,
				0.5,
				Math.min(width / 100, height / 100)
			);
    })
		.onEnd(() => {
			scale.value = 1;
		})
    .runOnJS(true);

  const imgAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinch}>
				<Animated.Image
					source={{uri: `${siteUrl}/${imageUrl}`}}
					style={[s`w-full`, imgAnimatedStyles, {aspectRatio: 1}]}
				/>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default ZoomImage;