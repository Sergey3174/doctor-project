export const fetchToken = async () => {
	const response = await fetch('http://localhost:3000/api/protected', {
		method: 'GET',
		credentials: 'include',
	});

	const result = await response.json();
	return result;
};
