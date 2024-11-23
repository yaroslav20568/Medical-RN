import React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { s } from "react-native-wind";

interface IProps {
	logo: any;
}

const HeaderLogo = ({ logo }: IProps) => {
	const { width } = useWindowDimensions();
	const logParams = Image.resolveAssetSource(logo);
	const k = logParams.width / logParams.height;
	const logoHeight = width / k;

	return (
		<Image
			source={logo}
			style={[s`w-full`, {height: logoHeight}]}
			resizeMode='cover'
		/>
	)
}

export default HeaderLogo;