import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { siteUrl } from '../../constants';
import { ITypeUser, IUser } from '../../types';

interface IProps {
	user: IUser | null;
	typesUsers: Array<ITypeUser>;
}

const UserProfile = observer(({ user, typesUsers }: IProps) => {
	const { width, height } = useWindowDimensions();

	return (
		<View style={s`px-3`}>
			<Image
				source={{uri: `${siteUrl}/${user?.imageUrl}`}}
				style={[s`${width > height ? 'w-1/2' : 'w-full'} mb-3`, {aspectRatio: 1.2}]}
			/>
			<Text style={s`text-base text-black pr-8 mb-3`}>E-mail: {user?.email}</Text>
			<Text style={s`text-base text-black pr-8 mb-3`}>Город: {user?.city}</Text>
			<Text style={s`text-base text-black pr-8 mb-3`}>Пол: {user?.gender}</Text>
			<Text style={s`text-base text-black pr-8 mb-3`}>Тип пользователя: 
				{user?.typesUsers.length !== 1 ?
					user?.typesUsers.split(',').map((typeUser, index) => {
						if(index === 0) {
							return ' ' + typesUsers[Number(typeUser)].name + ', ';
						}
						if(index + 1 < Number(user?.typesUsers.split(',').length)) {
							return typesUsers[Number(typeUser)].name + ', ';
						}
						return typesUsers[Number(typeUser)].name;
					}) :
					' '+ typesUsers[Number(user?.typesUsers)].name}
			</Text>
		</View>
	)
})

export default UserProfile;