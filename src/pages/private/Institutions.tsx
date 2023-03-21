import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { HeaderLogo, Map, InstitutionList } from '../../components';
import { institutionsStore } from '../../mobx';

const Institutions = observer(() => {
	useEffect(() => {
		institutionsStore.loadInstitutions();
	}, []);

	return (
		<View style={s`mb-3`}>
			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<HeaderLogo 
					logo={require('../../assets/images/vstrecha-logo.png')} 
				/>
				<Map
					institutions={institutionsStore.institutions}
				/>
				<InstitutionList
					institutions={institutionsStore.institutions}
				/>
			</ScrollView>
		</View>
	)
})

export default Institutions;