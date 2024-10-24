import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountWidgetsPanel, ConfirmModal, GoBack, HeaderLogo, HeaderModal, Modal, UserUpdateForm, UserProfile } from '../../components';
import { chatStore, institutionsStore, userStore } from '../../mobx';
import { useGetModalParams } from '../../hooks';
import { siteUrl } from '../../constants';
import { IUser } from '../../types';
import socket from '../../socket/chat-socket';

interface IProps extends NativeStackScreenProps<RootStackParams, 'AccountInner'> {}

const Account = observer(({ navigation }: IProps) => {
	const [updateAccAnimatedValue, updateAccTranslateX, showUpdateAccModal, hideUpdateAccModal] = useGetModalParams();
	const [deleteAccAnimatedValue, deleteAccTranslateX, showDeleteAccModal, hideDeleteAccModal] = useGetModalParams();
	const [deletePhotoAnimatedValue, deletePhotoTranslateX, showDeletePhotoModal, hideDeletePhotoModal] = useGetModalParams();
	const [logOutAnimatedValue, logOutTranslateX, showLogOutModal, hideLogOutModal] = useGetModalParams();

	const deleteUser = useCallback((): void => {
		hideDeleteAccModal();

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
					if(userStore.userData?.role === 'User') {
						socket.emit('get-dialogs-admin');
					}
					userStore.setIsAuth(false);
					userStore.setUserData(null);
					chatStore.messages.length && chatStore.setMessages([]);
					chatStore.dialogs.length && chatStore.setDialogs([]);
				}, 1000);
			}
		})
	}, []);

	const deletePhoto = useCallback((): void => {
		hideDeletePhotoModal();

		axios<IUser>({
			url: `${siteUrl}/api/user/delete-photo/${userStore.userData?.id}`,
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then((response) => {
			if(response.status === 200) {
				setTimeout(() => {
					userStore.setUserData(response.data);
				}, 1000);
			}
		})
	}, []);

	const logOut = useCallback((): void => {
		hideLogOutModal();

		AsyncStorage.setItem('@userData', '');
		setTimeout(() => {
			userStore.setIsAuth(false);
			userStore.setUserData(null);
			chatStore.messages.length && chatStore.setMessages([]);
			chatStore.dialogs.length && chatStore.setDialogs([]);
		}, 1000);
	}, []);

	const navigateToAnalyzes = useCallback(() => {
		navigation.navigate('Analyzes');
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
					showModal={showUpdateAccModal}
					showDeleteAccModal={showDeleteAccModal}
					showDeletePhotoModal={showDeletePhotoModal}
					showLogOutModal={showLogOutModal}
					imageUrl={userStore.userData?.imageUrl}
					navigateToAnalyzes={navigateToAnalyzes}
				/>
				<UserProfile 
					user={userStore.userData}
					typesUsers={institutionsStore.typesUsers}
				/>
			</ScrollView>
			<Modal
				translateX={updateAccTranslateX}
				animatedValue={updateAccAnimatedValue}
			>
				<HeaderModal 
					title='Обновление данных' 
					hideModal={hideUpdateAccModal} 
				/>
				<UserUpdateForm 
					typesUsers={institutionsStore.typesUsers} 
					userId={userStore.userData?.id}
					hideModal={hideUpdateAccModal}
				/>
			</Modal>
			<ConfirmModal
				translateX={deleteAccTranslateX}
				animatedValue={deleteAccAnimatedValue}
				hideModal={hideDeleteAccModal}
				onPress={deleteUser}
				message='Вы действительно хотите удалить аккаунт?'
			/>
			<ConfirmModal
				translateX={deletePhotoTranslateX}
				animatedValue={deletePhotoAnimatedValue}
				hideModal={hideDeletePhotoModal}
				onPress={deletePhoto}
				message='Вы действительно хотите удалить фото?'
			/>
			<ConfirmModal
				translateX={logOutTranslateX}
				animatedValue={logOutAnimatedValue}
				hideModal={hideLogOutModal}
				onPress={logOut}
				message='Вы действительно хотите выйти с аккаунта?'
			/>
		</>
	)
})

export default Account;