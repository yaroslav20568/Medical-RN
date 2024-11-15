import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { s } from 'react-native-wind';
import { ILibraryItem } from '../../types';

interface IProps {
	libraryItems: Array<ILibraryItem>;
	onHandleNavigation: (libraryItem: ILibraryItem) => void;
}

const LibraryItems = ({ libraryItems, onHandleNavigation }: IProps) => {
	return (
		<>
			{libraryItems.length ? 
				libraryItems.map((libraryItem, index) => 
					<TouchableOpacity 
						style={s`mb-4`}
						activeOpacity={.7}
						onPress={() => onHandleNavigation(libraryItem)}
						key={`libraryItem_${index}`}
					>
						<Text style={s`mb-3 text-xl text-black`}>{index + 1}. {libraryItem.title}</Text>
						<RenderHtml
							contentWidth={300}
							source={{html: '<img' + libraryItem.text.match(/<img(.+?)\>/)![1] + '/>'}}
						/>
					</TouchableOpacity>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Статьи не найдены</Text>}
		</>
	)
}

export default LibraryItems;