import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchToken } from '../../utils/fetch-token';

export const PrivateRoute = ({ children }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetchToken().then((res) => {
			setData(res);
		});
	}, []);

	if (data?.error) {
		return <Navigate to="/login" />;
	}

	return children;
};
