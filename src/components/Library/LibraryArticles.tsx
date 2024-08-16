import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { s } from 'react-native-wind';
import { observer } from 'mobx-react-lite';
import { ILibraryArticle } from '../../types';

interface IProps {
	libraryArticles: Array<ILibraryArticle>;
	onHandleNavigation: (id: number, name: string) => void;
}

const LibraryArticles = observer(({ libraryArticles, onHandleNavigation }: IProps) => {
	return (
		<>
			{libraryArticles.length ? 
				libraryArticles.map((item, index) => 
					<TouchableOpacity 
						style={s`flex-row items-center justify-between bg-white rounded-xl px-3 py-4 mb-4`}
						onPress={() => onHandleNavigation(item.id, item.name)}
						activeOpacity={.7}
						key={`libraryMenuItem_${index}`}
					>
						<View style={s`flex-row items-center`}>
							<Text style={s`text-base text-black`}>{item.name}</Text>
						</View>
						<SimpleLineIcons name='arrow-right' size={20} color='#294CB4' />
					</TouchableOpacity>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Разделы библиотеки не найдены</Text>}
		</>
	)
})

export default LibraryArticles;