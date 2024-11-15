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

const regions = [
	{label: 'Минская', value: 'Минская'},
	{label: 'Витебская', value: 'Витебская'},
	{label: 'Гродненская', value: 'Гродненская'},
	{label: 'Брестская', value: 'Брестская'},
	{label: 'Гомельская', value: 'Гомельская'},
	{label: 'Могилёвская', value: 'Могилёвская'}
];

const Institutions = observer(({ navigation }: IProps) => {
	const [name, setName] = useState<string>('');
	const [region, setRegion] = useState<string>('');
	const [cityId, setCityId] = useState<number | ''>('');
	const [typeInstitutionId, setTypeInstitutionId] = useState<number | ''>('');
	const [typesUsersNum, setTypesUsersNum] = useState<Array<number>>([]);
	const [searchAnimatedValue, searchTranslateX, showSearchModal, hideSearchModal] = useGetModalParams();
	const [filterAnimatedValue, filterTranslateX, showFilterModal, hideFilterModal] = useGetModalParams();

	useEffect(() => {
		institutionsStore.loadInstitutions(name, region, cityId, typeInstitutionId, typesUsersNum);
	}, [name, region, cityId, typeInstitutionId, typesUsersNum]);

	const loadMoreInstitutions = useCallback((): void => {
		institutionsStore.loadMoreInstitutions();
	}, []);

	const clearSearchParams = useCallback((): void => {
		setName('');
	}, []);

	const clearFilterParams = useCallback((): void => {
		setRegion('');
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
					institutions={institutionsStore.institutions}
				/>
				<InstitutionsWidgetsPanel
					title='Учреждения'
					showSearchModal={showSearchModal}
					showFilterModal={showFilterModal}
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
						label: 'Область',
						value: '',
						color: '#9EA0A4',
					}}
					value={region}
					onValueChange={setRegion}
					items={regions}
				/>
				<InstitutionsFilter 
					cities={institutionsStore.getCities} 
					cityId={cityId}
					setCityId={setCityId}
					typesInstitution={institutionsStore.getTypesInstitution}
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

export default Institutions;