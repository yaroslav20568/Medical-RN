import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/HomeStacks';
import { HeaderLogo, GoBack, Loader, Hotlines } from '../../components';
import { quickHelpStore } from '../../mobx';

interface IProps extends NativeStackScreenProps<RootStackParams, 'QuickHelp'> {}

const QuickHelp = observer(({ navigation }: IProps) => {
	useEffect(() => {
		quickHelpStore.loadHotlines();
	}, []);

	const loadMoreHotlines = useCallback(() => {
		quickHelpStore.loadMoreHotlines();
	}, []);

	return (
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
			<View style={s`mt-3 px-3`}>
				<Text style={s`text-2xl font-semibold text-black mb-4`}>Горячие линии: </Text>
				{!quickHelpStore.isLoaded ?
					<Loader /> :
					<Hotlines 
						hotlines={quickHelpStore.hotlines}
						loadMoreHotlines={loadMoreHotlines}
						isLoadingMore={quickHelpStore.isLoadingMore}
					/>
				}
			</View>
		</ScrollView>
	)
})

export default QuickHelp;