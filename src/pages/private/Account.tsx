import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoBack, HeaderLogo } from '../../components';
import { institutionsStore, userStore } from '../../mobx';
import { siteUrl } from '../../constants';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Account'> {}

const Account = ({ navigation }: IProps) => {
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
			<View style={s`mt-6 px-3`}>
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Пользователь</Text>
				<Image
					source={{uri: `${siteUrl}/${userStore.userData?.imageUrl}`}}
					style={[s`w-full mb-3`, {height: 250}]}
					resizeMode='cover'
				/>
				<Text style={s`text-base text-black pr-8 mb-3`}>E-mail: {userStore.userData?.email}</Text>
				<Text style={s`text-base text-black pr-8 mb-3`}>Город: {userStore.userData?.city}</Text>
				<Text style={s`text-base text-black pr-8 mb-3`}>Пол: {userStore.userData?.gender}</Text>
				<Text style={s`text-base text-black pr-8 mb-3`}>Тип пользователя: 
					{userStore.userData?.typesUsers.length !== 1 ?
						userStore.userData?.typesUsers.split(',').map((typeUser, index) => {
							if(index === 0) {
								return ' ' + institutionsStore.typesUsers[Number(typeUser)].name + ', ';
							}
							if(index + 1 < Number(userStore.userData?.typesUsers.split(',').length)) {
								return institutionsStore.typesUsers[Number(typeUser)].name + ', ';
							}
							return institutionsStore.typesUsers[Number(typeUser)].name;
						}) :
						' '+ institutionsStore.typesUsers[Number(userStore.userData?.typesUsers)].name}
				</Text>
				<Text></Text>
			</View>
		</ScrollView>
	)
}

export default Account;