import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from '../../utils/fetch-token';

const authFormSchema = yup.object().shape({
	email: yup.string().email('Некорректный email адрес').required('Заполните почту'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const LoginPage = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();

	const onSubmit = ({ email, password }) => {
		fetch('http://localhost:3000/login/', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.error) {
					setServerError(data.error);
					return;
				}
				reset();
				navigate('/application');
			});
	};
	const formError = errors?.email?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	useEffect(() => {
		fetchToken().then((res) => {
			if (!res?.error) {
				navigate('/application');
			}
		});
	});

	return (
		<div className="form-container">
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Логин..."
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				></input>
				<input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				></input>
				<button type="submit" disabled={!!formError}>
					Авторизоваться
				</button>
				{errorMessage && (
					<div
						style={{
							boxSizing: 'border-box',
							background: 'rgb(255 147 172)',
							width: '100%',
							padding: '5px',
						}}
					>
						{errorMessage}
					</div>
				)}
			</form>
		</div>
	);
};
