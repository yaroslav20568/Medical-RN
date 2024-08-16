import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { s } from 'react-native-wind';
import { ILibraryItem } from '../../types';

interface IProps {
	articles: Array<ILibraryItem>;
	onHandleNavigation: (item: ILibraryItem) => void;
}

const LibraryItems = ({ articles, onHandleNavigation }: IProps) => {
	return (
		<>
			{articles.length ? 
				articles.map((item, index) => 
					<TouchableOpacity 
						style={s`mb-4`}
						activeOpacity={.7}
						onPress={() => onHandleNavigation(item)}
						key={`article_${index}`}
					>
						<Text style={s`mb-3 text-xl text-black`}>{index + 1}. {item.title}</Text>
						<RenderHtml
							contentWidth={300}
							source={{html: '<img' + item.text.match(/<img(.+?)\>/)![1] + '/>'}}
						/>
					</TouchableOpacity>
				) : 
				<Text style={[s`text-lg font-semibold`]}>Статьи не найдены</Text>}
		</>
	)
}

export default LibraryItems;