import { useEffect } from 'react';

import { authStore } from '@/store/authStore';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarDashBoard } from '../dashboard';

export const DashboardLayout = () => {
	const navigate = useNavigate();

	const { token, status } = authStore((state) => state.initialState);

	useEffect(() => {
		if (!token && status === 'not-authenticated') {
			navigate('/');
		}
	}, [token, status, navigate]);

	return (
		<main className='grid grid-cols-[15rem_1fr] min-h-screen'>
			<SidebarDashBoard />

			<section className='bg-[#f1f1f1] min-h-screen p-4'>
				<Outlet />
			</section>
		</main>
	);
};
