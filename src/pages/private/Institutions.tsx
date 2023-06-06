import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Animated, Dimensions } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { HeaderLogo, Map, InstitutionList, Loader, WidgetsPanel, InstitutionSearch, HeaderModal, Modal } from '../../components';
import { institutionsStore } from '../../mobx';

const Institutions = observer(() => {
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		institutionsStore.loadInstitutions(inputValue);
	}, [inputValue]);

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
				/>
				{institutionsStore.isLoading ? 
					<Loader /> : 
					<InstitutionList
						institutions={institutionsStore.institutions}
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
				/>
				<InstitutionSearch 
					inputValue={inputValue}
					setInputValue={setInputValue}
				/>
			</Modal>
		</>
	)
})

export default Institutions;