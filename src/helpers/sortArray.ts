const sortArray = (array: Array<number>): Array<number> => {
	const newSortArray = array.slice().sort(function(a: number, b: number) {
		return a - b;
	});

	return newSortArray;
};

export default sortArray;