const newArray: any = [];

const traversingTreeArray = (array: any) => {
	array.forEach((obj: any) => {
		if(Array.isArray(obj.childrens) && obj.childrens?.length) {
			newArray.push(obj);
			traversingTreeArray(obj.childrens);
		} else {
			newArray.push(obj);
		}
	});
	return newArray;
};

export default traversingTreeArray;