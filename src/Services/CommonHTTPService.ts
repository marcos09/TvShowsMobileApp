const getJsonResponse = async (url: string) => {
	try {
		const response = await fetch(url);
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (error) {
		console.error(error);
	}
};

export {getJsonResponse};
