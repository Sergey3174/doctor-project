import './request-page.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const regFormSchema = yup.object().shape({
	name: yup.string().required('Заполните ФИО'),
	telephone: yup
		.string()
		.required('Заполните номер телефона')
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(11, 'Неверно заполнен пароль. Максимум 30 символов'),
	description: yup.string().required('Заполните описание вашей проблемы'),
});

export const RequestPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			telephone: '',
			description: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const [blockButton, setBlockButton] = useState(false);

	const onSubmit = ({ name, telephone, description }) => {
		setBlockButton(true);
		fetch('http://localhost:3000/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, telephone, description }),
		}).then(() => {
			reset();
			setBlockButton(false);
		});
	};

	const formError =
		errors?.name?.message ||
		errors?.telephone?.message ||
		errors?.description?.message;

	const errorMessage = formError || serverError;

	return (
		<div className="form-container">
			<h2>Запись к врачу</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="ФИО"
					{...register('name', {
						onChange: () => setServerError(null),
					})}
				></input>
				<input
					type="number"
					placeholder="Номер телефона"
					{...register('telephone', {
						onChange: () => setServerError(null),
					})}
				></input>
				<textarea
					className="description-problem"
					type="text"
					placeholder="Опишите проблему"
					{...register('description', {
						onChange: () => setServerError(null),
					})}
				></textarea>
				<button type="submit" disabled={!!formError || blockButton}>
					Отправить
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

			<Link to="/login">Вход сотрудников</Link>
		</div>
	);
};
