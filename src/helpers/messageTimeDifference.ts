const messageTimeDifference = (messageStringDate: string): string => {
	const timeDiff = Math.abs(new Date().getTime() - new Date(messageStringDate).getTime());
	const diffTime = timeDiff / 1000;

	if(diffTime < 60) {
		return `${Math.round(diffTime)} cек`;
	}	else if(diffTime >= 60 && diffTime < 60 * 60) {
		return `${Math.round(diffTime / 60)} мин`;
	} else if(diffTime >= 60 * 60 && diffTime < 60 * 60 * 24) {
		return `${Math.round(diffTime / 60 / 60)} час`;
	} else if(diffTime >= 60 * 60 * 24 && diffTime < 60 * 60 * 24 * 30) {
		return `${Math.round(diffTime / 60 / 60 / 24)} дн`;
	} else if(diffTime >= 60 * 60 * 24 * 30 && diffTime < 60 * 60 * 24 * 30 * 12) {
		return `${Math.round(diffTime / 60 / 60 / 24 / 30)} мес`;
	} else {
		return `${Math.round(diffTime / 60 / 60 / 24 / 30 / 12)} год`;
	}
}

export default messageTimeDifference;