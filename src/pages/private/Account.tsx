import React from 'react';
import { ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { RootStackParams } from '../../navigation/HomeStacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountWidgetsPanel, ConfirmModal, GoBack, HeaderLogo, HeaderModal, Modal, UserProfile } from '../../components';
import { institutionsStore, userStore } from '../../mobx';
import { useGetModalParams } from '../../hooks';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Account'> {}

const Account = ({ navigation }: IProps) => {
	const [updateAnimatedValue, updateTranslateX, showUpdateModal, hideUpdateModal] = useGetModalParams();
	const [deleteAnimatedValue, deleteTranslateX, showDeleteModal, hideDeleteModal] = useGetModalParams();

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
				onPress={() => {
					console.log('action');
					hideDeleteModal();
				}}
				message='Вы действительно хотите удалить свой аккаунт?'
			/>
		</>
	)
}

export default Account;