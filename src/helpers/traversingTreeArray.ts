const newArray: any = [];

const traversingTreeArray = (array: any, deep?: number) => {
	const arrayDeep = deep ? array : addChildrensProperty(array);
	
	arrayDeep.forEach((obj: any) => {
		if(Array.isArray(obj.childrens) && obj.childrens?.length) {
			newArray.push(obj);
			traversingTreeArray(obj.childrens, 1);
		} else {
			newArray.push(obj);
		}
	});
	
	return newArray;
};

const addChildrensProperty = (array: any) => {
	const newArray: any = [];

	array.forEach((obj: any) => {
		obj.childrens = [];
	});

	array.forEach((obj: any) => {
		if(obj.parent !== 0) {
			const findParentIndex = array.findIndex((item: any) => item.id === obj.parent);
			array[findParentIndex]?.childrens.push(obj)
		} else {
			newArray.push(obj);
		}
	});

	return newArray;
};

export default traversingTreeArray;