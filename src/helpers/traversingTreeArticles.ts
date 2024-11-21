import { ILibraryArticle } from "../types";

const traversingTreeArticles = (array: Array<ILibraryArticle>): Array<ILibraryArticle> => {
	const structuredArray: Array<ILibraryArticle> = [];

	const updateStructureArticles = (arrayDeep: Array<ILibraryArticle>, deep: number): Array<ILibraryArticle> => {
		arrayDeep.forEach((obj) => {
			if(Array.isArray(obj.childrens) && obj.childrens.length) {
				structuredArray.push({...obj, deep});
				updateStructureArticles(obj.childrens, deep + 1);
			} else {
				structuredArray.push({...obj, deep});
			}
		});
		
		return structuredArray;
	}

	return updateStructureArticles(addChildrensArticles(array), 0);
};

const addChildrensArticles = (array: Array<ILibraryArticle>): Array<ILibraryArticle> => {
	const arrayWithChildrens: Array<ILibraryArticle> = array.map((elem) => ({...elem, childrens: []}));

	return arrayWithChildrens.flatMap((obj, _, arr) => {
		if(obj.parent !== 0) {
			const findParentIndex = arr.findIndex((item) => item.id === obj.parent);
			arr[findParentIndex].childrens?.push(obj);
			return [];
		} else {
			return obj;
		}
	});
};

export default traversingTreeArticles;