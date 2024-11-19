const checkProtocolInUrl = (url: string): string => {
	if(!url.includes('https://')) {
		return 'https://' + url;
	}
	return url;
}

export default checkProtocolInUrl;