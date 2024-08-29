const removeProtocolInUrl = (url: string): string => {
	return url.replace('https://', '') || url.replace('http://', '');
}

export default removeProtocolInUrl;