import { useEffect, useState } from 'react';
import './posts-page.css';
import { useNavigate } from 'react-router-dom';

export const PostsPage = () => {
	const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetch('http://localhost:3000/api/posts', {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => setPosts(data.posts));
	}, []);

	const sortedData = [...posts].sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? 1 : -1;
		}
		return 0;
	});

	const requestSort = (key) => {
		let direction = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const logout = () => {
		fetch('http://localhost:3000/logout', {
			method: 'GET',
			credentials: 'include',
		}).then(() => navigate('/login'));
	};

	return (
		<div className="posts-container">
			<header>
				<h2>Заявки из формы</h2>
				<span onClick={logout}>Выход</span>
			</header>

			<div className="table-header">
				<div className="header-cell" onClick={() => requestSort('date')}>
					Дата отправки
				</div>
				<div className="header-cell" onClick={() => requestSort('name')}>
					ФИО
				</div>
				<div className="header-cell" onClick={() => requestSort('telephone')}>
					Телефон
				</div>
				<div className="header-cell" onClick={() => requestSort('description')}>
					Проблема
				</div>
			</div>
			{sortedData.map((person) => (
				<div className="table-row" key={person._id}>
					<div className="table-cell">
						{new Date(person.createdAt).toLocaleDateString('ru-RU')}
					</div>
					<div className="table-cell">{person.name}</div>
					<div className="table-cell">{person.telephone}</div>
					<div className="table-cell">{person.description}</div>
				</div>
			))}
		</div>
	);
};
