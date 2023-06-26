import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';
import { HeaderLogo, Map, InstitutionList, Loader, WidgetsPanel, InstitutionSearch, HeaderModal, Modal, FilterInstitutions } from '../../components';
import { institutionsStore } from '../../mobx';

const Institutions = observer(() => {
	const [inputValue, setInputValue] = useState<string>('');
	const [region, setRegion] = useState<string>('');
	const [cityId, setCityId] = useState<number | ''>('');
	const [typeInstitutionId, setTypeInstitutionId] = useState<number | ''>('');
	const [typesUser, setTypesUser] = useState<Array<number>>([]);
	const [modalActive, setModalActive] = useState<string>('search');

	useEffect(() => {
		institutionsStore.loadInstitutions(inputValue, region, cityId, typeInstitutionId, typesUser);
	}, [inputValue, region, cityId, typeInstitutionId, typesUser]);

	const loadMoreInstitutions = useCallback(() => {
		institutionsStore.loadMoreInstitutions();
	}, []);

	const clearFilterParams = useCallback(() => {
		if(modalActive === 'search') {
			setInputValue('');
		} else {
			setRegion('');
			setCityId('');
			setTypeInstitutionId('');
			setTypesUser([]);
		}
	}, []);

	const { width } = Dimensions.get('window');

	const animatedValue = useRef(new Animated.Value(0)).current;

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-width, 0]
	})

	const showModal = () => {
		Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
	}

	const hideModal = () => {
		Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
	}

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={s`pb-3`}
			>
				<HeaderLogo 
					logo={require('../../assets/images/vstrecha-logo.png')} 
				/>
				<Map
					institutions={institutionsStore.institutions}
				/>
				<WidgetsPanel
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
					/>
				}
			</ScrollView>
			{modalActive === 'search' ? 
				<Modal 
					translateX={translateX}
					animatedValue={animatedValue}
				>
					<HeaderModal 
						title='Поиск' 
						hideModal={hideModal} 
						clearFilterParams={clearFilterParams}
					/>
					<InstitutionSearch 
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
				</Modal> :
				<Modal 
					translateX={translateX}
					animatedValue={animatedValue}
				>
					<HeaderModal 
						title='Фильтр' 
						hideModal={hideModal} 
						clearFilterParams={clearFilterParams}
					/>
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
					<FilterInstitutions 
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
				</Modal>}
		</>
	)
})

export default Institutions;