import React from 'react';
import { Image, Dimensions } from 'react-native';
import { s } from "react-native-wind";

interface IProps {
	logo: any;
}

const HeaderLogo = ({ logo }: IProps) => {
	const window = Dimensions.get('window');
	const logParams = Image.resolveAssetSource(logo);
	const k = logParams.width / logParams.height;
	const logoHeight = window.width / k;

	return (
		<Image
			source={logo}
			style={[s`w-full`, {height: logoHeight}]}
			resizeMode='cover'
		/>
	)
}

export default HeaderLogo;