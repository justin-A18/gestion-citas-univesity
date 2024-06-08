import { useEffect } from 'react';

import { TypographyH1, TypographyH2, TypographyP } from '../typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { authStore } from '@/store/authStore';

export const AuthLayout = () => {
	const navigate = useNavigate();

	const { token, status } = authStore((state) => state.initialState);

	useEffect(() => {
		if (token && status === 'authenticated') {
			navigate('/dashboard');
		}
	}, [token, status,navigate]);

	return (
		<main className='w-full h-screen bg-[#f1f1f1] flex items-center justify-center'>
			<div className='w-[90%] sm:w-[400px] bg-white flex gap-3 flex-col items-center p-4 rounded-lg'>
				<TypographyH1 className='text-[#252136] text-3xl flex items-center uppercase'>
					<span>Salu</span>
					<img
						className='size-8'
						src='/logo.svg'
						alt='logo'
					/>
					<span>Vital</span>
				</TypographyH1>

				<TypographyH2 className='text-[#36AE6E] font-bold text-xl'>
					Hola, Bienvenido de vuelta ✋!
				</TypographyH2>

				<TypographyP className='text-md text-[#8a8a8a]'>
					Introduce tus credenciales para continuar
				</TypographyP>

				<Outlet />
			</div>
		</main>
	);
};
