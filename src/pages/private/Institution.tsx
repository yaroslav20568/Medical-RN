import React from 'react';
import { ScrollView, View, Text, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { s } from 'react-native-wind';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { observer } from 'mobx-react-lite';
import { GoBack, HeaderLogo } from '../../components';
import { siteUrl } from '../../constants';
import { removeProtocolInUrl, checkProtocolInUrl } from '../../helpers';
import { institutionsStore } from '../../mobx';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Institution'> {}

const Institution = observer(({ route, navigation }: IProps) => {
	const { id, name, city, region, photo, address, phone, email, socialNetwork, linkWebsite, description, addInfo, workingHours, type, typesUsers } = route.params.institution;

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
			<View style={s`mt-3 px-3`}>
				<View>
					<Animated.Text 
						style={[s`text-xl font-bold text-black mb-3`, {lineHeight: 24}]} 
						entering={FadeInUp.delay(300).duration(1000)}
					>
						{name}
					</Animated.Text>
					<Animated.Image 
						source={{uri: `${siteUrl}/${photo}`}}
						style={s`w-full h-60 rounded-xl mb-3`}
						sharedTransitionTag={`tag_${id}`}
					/>
				</View>
				<Animated.View entering={FadeInDown.delay(600).duration(1000)}>
					<View>
						<View style={s`flex-row mb-3`}>
							<Ionicons 
								name='location-sharp' 
								size={25} 
								color='#294CB4' 
								style={s`mr-2`}
							/>
							<Text style={s`text-base text-black pr-8`}>
								{city.country.name}, {region ? `${region} область`: `${city.country.name} страна`}, г. {city.name}, {address}
							</Text>
						</View>
						<View style={s`flex-row ml-1 mb-3`}>
							<FontAwesome 
								name='phone' 
								size={25} 
								color='#294CB4' 
								style={s`mr-2`}
							/>
							<Text 
								style={s`text-base text-black underline pr-8`}
								onPress={() => Linking.openURL(`tel:${phone}`)}
							>
								{phone}
							</Text>
						</View>
						<View style={s`flex-row mb-3`}>
							<MaterialCommunityIcons 
								name='email' 
								size={25} 
								color='#294CB4' 
								style={s`mr-2`}
							/>
							<Text 
								style={s`text-base text-black underline pr-8`}
								onPress={() => Linking.openURL(`mailto:${email}`)}
							>
								{email}
							</Text>
						</View>
						<View style={s`flex-row mb-3`}>
							<Entypo 
								name='network' 
								size={25} 
								color='#294CB4' 
								style={s`mr-2`}
							/>
							<Text style={s`text-base text-black pr-8`}>{socialNetwork}</Text>
						</View>
						<View style={s`flex-row mb-3`}>
							<MaterialCommunityIcons 
								name='web' 
								size={25} 
								color='#294CB4' 
								style={s`mr-2`}
							/>
							<Text 
								style={s`text-base text-black underline pr-8`} 
								onPress={() => Linking.openURL(checkProtocolInUrl(linkWebsite))}
							>
								{removeProtocolInUrl(linkWebsite)}
							</Text>
						</View>
					</View>
					<View style={s`mb-3`}>
						<Text style={s`text-lg font-bold text-black mb-2`}>Описание</Text>
						<Text style={s`text-base text-black`}>{description}</Text>
					</View>
					<View style={s`mb-3`}>
						<Text style={s`text-lg font-bold text-black mb-2`}>Дополнительная информация</Text>
						<Text style={s`text-base text-black`}>{addInfo}</Text>
					</View>
					<View style={s`mb-3`}>
						<Text style={s`text-lg font-bold text-black mb-2`}>Время работы</Text>
						<Text style={s`text-base text-black`}>{workingHours}</Text>
					</View>
					<View style={s`mb-3`}>
						<Text style={s`text-lg font-bold text-black mb-2`}>Тип организации</Text>
						<Text style={s`text-base text-black`}>{type.name}</Text>
					</View>
					<View>
						<Text style={s`text-lg font-bold text-black mb-2`}>К какому типу пользователей относится</Text>
						<View>
							{typesUsers.split(',').map((typeUser, index) => 
								<Text
									style={s`text-base text-black`}
									key={`typeUser_${index}`}
								>
									{index + 1}. {institutionsStore.typesUsers[+typeUser].name}
								</Text>
							)}
						</View>
					</View>
				</Animated.View>
			</View>
		</ScrollView>
	)
})

export default Institution;