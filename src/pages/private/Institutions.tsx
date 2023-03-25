import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { HeaderLogo, Map, InstitutionList, Loader } from '../../components';
import { institutionsStore } from '../../mobx';

const Institutions = observer(() => {
	useEffect(() => {
		institutionsStore.loadInstitutions();
	}, []);

	return (
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
			{institutionsStore.isLoading ? 
				<Loader /> : 
				<InstitutionList
					institutions={institutionsStore.institutions}
				/>
			}
		</ScrollView>
	)
})

export default Institutions;