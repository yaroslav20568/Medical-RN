import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { HeaderLogo, Map, InstitutionList, Loader, InstitutionsWidgetsPanel, InstitutionSearch, HeaderModal, Modal, InstitutionsFilter, GoBack } from '../../components';
import { institutionsStore } from '../../mobx';
import { useGetModalParams } from '../../hooks';

interface IProps extends NativeStackScreenProps<RootStackParams, 'Institutions'> {}

const Institutions = observer(({ navigation }: IProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [region, setRegion] = useState<string>('');
	const [cityId, setCityId] = useState<number | ''>('');
	const [typeInstitutionId, setTypeInstitutionId] = useState<number | ''>('');
	const [typesUser, setTypesUser] = useState<Array<number>>([]);
	const [modalActive, setModalActive] = useState<string>('search');
	const [animatedValue, translateX, showModal, hideModal] = useGetModalParams();

	useEffect(() => {
		institutionsStore.loadInstitutions(inputValue, region, cityId, typeInstitutionId, typesUser);
	}, [inputValue, region, cityId, typeInstitutionId, typesUser]);

	const loadMoreInstitutions = useCallback((): void => {
		institutionsStore.loadMoreInstitutions();
	}, []);

	const clearFilterParams = useCallback((): void => {
		if(modalActive === 'search') {
			setInputValue('');
		} else {
			setRegion('');
			setCityId('');
			setTypeInstitutionId('');
			setTypesUser([]);
		}
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
				<Map
					institutions={institutionsStore.institutions}
				/>
				<InstitutionsWidgetsPanel
					title='Учреждения'
					showModal={showModal}
					setModalActive={setModalActive}
				/>
				{institutionsStore.isLoading ? 
					<Loader /> : 
					<InstitutionList
						institutions={institutionsStore.institutions}
						loadMoreInstitutions={loadMoreInstitutions}
						isLoadingMore={institutionsStore.isLoadingMore}
						navigation={navigation}
					/>
				}
			</ScrollView>
			<Modal 
				translateX={translateX}
				animatedValue={animatedValue}
			>
				<HeaderModal 
					title='Поиск' 
					hideModal={hideModal} 
					clearFilterParams={clearFilterParams}
				/>
				{modalActive === 'search' ?
					<InstitutionSearch 
						inputValue={inputValue}
						setInputValue={setInputValue}
					/> :
					<>
						<RNPickerSelect
							placeholder = {{
								label: 'Область',
								value: '',
								color: '#9EA0A4',
							}}
							value={region}
							onValueChange={setRegion}
							items={[
								{label: 'Минская', value: 'Минская'},
								{label: 'Витебская', value: 'Витебская'},
								{label: 'Гродненская', value: 'Гродненская'},
								{label: 'Брестская', value: 'Брестская'},
								{label: 'Гомельская', value: 'Гомельская'},
								{label: 'Могилёвская', value: 'Могилёвская'}
							]}
						/>
						<InstitutionsFilter 
							cities={institutionsStore.getCities} 
							cityId={cityId}
							setCityId={setCityId}
							typesInstitution={institutionsStore.getTypesInstitution}
							typeInstitutionId={typeInstitutionId}
							setTypeInstitutionId={setTypeInstitutionId}
							typesUserItems={institutionsStore.getTypesUser}
							typesUser={typesUser}
							setTypesUser={setTypesUser}
						/>
					</>}
			</Modal>
		</>
	)
})

export default Institutions;