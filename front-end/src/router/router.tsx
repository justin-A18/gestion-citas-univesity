import { createBrowserRouter } from 'react-router-dom';

import { DashBoardPage, ErrorPage, LoginPage } from '../pages';
import { AuthLayout, DashboardLayout } from '../components/layouts';
import { DoctorsPage } from '@/pages/DoctorsPage';
import { CreateCite } from '@/pages/CreateCite';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: '/',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: '/dashboard',
				element: <DashBoardPage />,
			},
			{
				path: '/dashboard/doctors',
				element: <DoctorsPage />,
			},
			{
				path: '/dashboard/cite/create',
				element: <CreateCite />,
			},
		],
	},
]);
