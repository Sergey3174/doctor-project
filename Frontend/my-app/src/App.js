import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage, PostsPage, RequestPage } from './pages';
import { PrivateRoute } from './components';

export const App = () => {
	return (
		<div className="container-app">
			<Routes>
				<Route path="/" element={<RequestPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/application"
					element={
						<PrivateRoute>
							<PostsPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
};
