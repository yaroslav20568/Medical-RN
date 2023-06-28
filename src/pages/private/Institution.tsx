import React from 'react';
import { ScrollView, View, Text, Image, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { s } from 'react-native-wind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoBack, HeaderLogo } from '../../components';
import { IInstitutionRB, navigationType } from '../../types';

interface IProps {
	route: RouteProp<{ params: { institution: IInstitutionRB } }, 'params'>;
	navigation: navigationType;
}

const Institution = ({ route, navigation }: IProps) => {
	const { name, photo, address, phone, email, link_website, add_info } = route.params.institution;

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={s`pb-3`}
		>
			<HeaderLogo 
				logo={require('../../assets/images/vstrecha-logo.png')} 
			/>
			<GoBack 
				navigation={navigation} 
			/>
			<View style={s`mt-3 mb-3 px-3`}>
				<Text style={[s`text-xl font-bold text-black mb-3`, {lineHeight: 24}]}>{name}</Text>
				<Image 
					source={{uri: photo}}
					style={s`w-full h-60 rounded-xl mb-3`}
				/>
				<View style={s`flex-row mb-3`}>
					<Ionicons 
						name='location-sharp' 
						size={25} 
						color='#294CB4' 
						style={s`mr-2`}
					/>
					<Text style={s`text-base text-black pr-8`}>{address}</Text>
				</View>
				<View style={s`flex-row ml-1 mb-3`}>
					<FontAwesome 
						name='phone' 
						size={25} 
						color='#294CB4' 
						style={s`mr-2`}
					/>
					<Text style={s`text-base text-black pr-8`}>{phone}</Text>
				</View>
				<View style={s`flex-row mb-3`}>
					<MaterialCommunityIcons 
						name='email' 
						size={25} 
						color='#294CB4' 
						style={s`mr-2`}
					/>
					<Text style={s`text-base text-black pr-8`}>{email}</Text>
				</View>
				<View style={s`flex-row mb-3`}>
					<MaterialCommunityIcons 
						name='web' 
						size={25} 
						color='#294CB4' 
						style={s`mr-2`}
					/>
					<Text style={s`text-base text-black underline pr-8`} onPress={() => Linking.openURL('link_website')}>{link_website}</Text>
				</View>
				<View>
					<Text style={s`text-lg font-bold text-black mb-2`}>Об учреждении</Text>
					<Text style={s`text-base text-black`}>{add_info}</Text>
				</View>
			</View>
		</ScrollView>
	)
}

export default Institution;