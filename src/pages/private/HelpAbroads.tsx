import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { HeaderLogo, Map, InstitutionList, Loader, InstitutionsWidgetsPanel, InstitutionSearch, HeaderModal, Modal, InstitutionsFilter, GoBack } from '../../components';
import { helpAbroadsStore, institutionsStore } from '../../mobx';
import { useGetModalParams } from '../../hooks';

interface IProps extends NativeStackScreenProps<RootStackParams, 'HelpAbroads'> {}

const HelpAbroads = observer(({ navigation }: IProps) => {
	const [name, setName] = useState<string>('');
	const [cityId, setCityId] = useState<number | ''>('');
	const [countryId, setCountryId] = useState<number | ''>('');
	const [typeInstitutionId, setTypeInstitutionId] = useState<number | ''>('');
	const [typesUsersNum, setTypesUsersNum] = useState<Array<number>>([]);
	const [modalActive, setModalActive] = useState<string>('search');
	const [searchAnimatedValue, searchTranslateX, showSearchModal, hideSearchModal] = useGetModalParams();
	const [filterAnimatedValue, filterTranslateX, showFilterModal, hideFilterModal] = useGetModalParams();

	useEffect(() => {
		helpAbroadsStore.loadInstitutions(name, cityId, countryId, typeInstitutionId, typesUsersNum);
	}, [name, cityId, countryId, typeInstitutionId, typesUsersNum]);

	const loadMoreInstitutions = useCallback((): void => {
		helpAbroadsStore.loadMoreInstitutions();
	}, []);

	const clearSearchParams = useCallback((): void => {
		setName('');
	}, []);

	const clearFilterParams = useCallback((): void => {
		setCountryId('');
		setCityId('');
		setTypeInstitutionId('');
		setTypesUsersNum([]);
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
					institutions={helpAbroadsStore.institutions}
				/>
				<InstitutionsWidgetsPanel
					title='Учреждения'
					showSearchModal={showSearchModal}
					showFilterModal={showFilterModal}
				/>
				{helpAbroadsStore.isLoading ? 
					<Loader /> : 
					<InstitutionList
						institutions={helpAbroadsStore.institutions}
						loadMoreInstitutions={loadMoreInstitutions}
						isLoadingMore={helpAbroadsStore.isLoadingMore}
						navigation={navigation}
					/>
				}
			</ScrollView>
			<Modal 
				translateX={searchTranslateX}
				animatedValue={searchAnimatedValue}
			>
				<HeaderModal 
					title='Поиск' 
					hideModal={hideSearchModal} 
					clearParams={clearSearchParams}
				/>
				<InstitutionSearch 
					name={name}
					setName={setName}
				/>
			</Modal>
			<Modal 
				translateX={filterTranslateX}
				animatedValue={filterAnimatedValue}
			>
				<HeaderModal 
					title='Поиск' 
					hideModal={hideFilterModal} 
					clearParams={clearFilterParams}
				/>
				<RNPickerSelect
					placeholder = {{
						label: 'Страна',
						value: '',
						color: '#9EA0A4',
					}}
					value={countryId}
					onValueChange={setCountryId}
					items={helpAbroadsStore.getСountries}
				/>
				<InstitutionsFilter 
					cities={helpAbroadsStore.getCities} 
					cityId={cityId}
					setCityId={setCityId}
					typesInstitution={helpAbroadsStore.getTypesInstitution}
					typeInstitutionId={typeInstitutionId}
					setTypeInstitutionId={setTypeInstitutionId}
					typesUsers={institutionsStore.typesUsers}
					typesUsersNum={typesUsersNum}
					setTypesUsersNum={setTypesUsersNum}
				/>
			</Modal>
		</>
	)
})

export default HelpAbroads;