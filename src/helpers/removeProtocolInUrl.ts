const removeProtocolInUrl = (url: string) => {
	return url.replace('https://', '') || url.replace('http://', '');
}

export default removeProtocolInUrl;