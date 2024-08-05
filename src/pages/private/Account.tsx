import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountWidgetsPanel, ConfirmModal, GoBack, HeaderLogo, HeaderModal, Modal, UserProfile } from '../../components';
import { institutionsStore, userStore } from '../../mobx';
import { useGetModalParams } from '../../hooks';
import { siteUrl } from '../../constants';
import { IUser } from '../../types';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Account'> {}

const Account = observer(({ navigation }: IProps) => {
	const [updateAnimatedValue, updateTranslateX, showUpdateModal, hideUpdateModal] = useGetModalParams();
	const [deleteAnimatedValue, deleteTranslateX, showDeleteModal, hideDeleteModal] = useGetModalParams();

	const deleteUser = useCallback((): void => {
		hideDeleteModal();

		axios<IUser>({
			url: `${siteUrl}/api/user/${userStore.userData?.id}`,
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then((response) => {
			if(response.status === 200) {
				AsyncStorage.setItem('@userData', '');
				setTimeout(() => {
					userStore.setIsAuth(false);
					userStore.setUserData(null);
				}, 1000);
			}
		})
	}, []);

	return (
		<>
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
				<AccountWidgetsPanel 
					title='Пользователь'
					showModal={showUpdateModal}
					showConfirmModal={showDeleteModal}
				/>
				<UserProfile 
					user={userStore.userData}
					typesUsers={institutionsStore.typesUsers}
				/>
			</ScrollView>
			<Modal
				translateX={updateTranslateX}
				animatedValue={updateAnimatedValue}
			>
				<HeaderModal 
					title='Обновление данных' 
					hideModal={hideUpdateModal} 
					clearFilterParams={() => {}}
				/>
			</Modal>
			<ConfirmModal
				translateX={deleteTranslateX}
				animatedValue={deleteAnimatedValue}
				hideModal={hideDeleteModal}
				onPress={deleteUser}
				message='Вы действительно хотите удалить свой аккаунт?'
			/>
		</>
	)
})

export default Account;