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
				libraryArticles.map((libraryArticle, index) => 
					<TouchableOpacity 
						style={s`flex-row items-center justify-between bg-white rounded-xl px-3 py-3 mb-4 ${libraryArticle.deep ? `ml-${libraryArticle.deep * 6}` : ''}`}
						onPress={() => onHandleNavigation(libraryArticle.id, libraryArticle.name)}
						activeOpacity={.7}
						key={`libraryArticle_${index}`}
					>
						<Text style={s`text-base text-black`}>{libraryArticle.name}</Text>
						<SimpleLineIcons name='arrow-right' size={20} color='#294CB4' />
					</TouchableOpacity>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Разделы библиотеки не найдены</Text>}
		</>
	)
})

export default LibraryArticles;