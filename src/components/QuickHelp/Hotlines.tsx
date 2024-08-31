import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { IHotline } from '../../types';
import { s } from 'react-native-wind';
import Loader from '../General/Loader';
import { Hotline } from '../../components';

interface IProps {
	hotlines: Array<IHotline>;
	isLoadingMore: boolean;
	loadMoreHotlines: () => void;
}

const Hotlines = observer(({ hotlines, loadMoreHotlines, isLoadingMore }: IProps) => {
	return (
		<>
			{hotlines.length ? 
				<FlatList
					data={hotlines}
					renderItem={({ item, index }) => 
						<Hotline 
							{...item} 
							index={index} 
							key={`hotline_${index}`} 
						/>
					}
					ItemSeparatorComponent={() => <View style={s`mb-4`} />}
					onEndReachedThreshold={0}
					onEndReached={loadMoreHotlines}
				/> : 
				<Text style={[s`text-lg font-semibold`]}>Горячие линии не найдены</Text>
			}
			{isLoadingMore && <View style={s`absolute w-full bottom-2`}><Loader /></View>}
		</>
	)
})

export default Hotlines;