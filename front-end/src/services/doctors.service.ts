import { helpHttp } from '@/helpers';
import { AxiosError, AxiosResponse } from 'axios';

export const getDoctorsService = async (token: string) => {
	const res = await helpHttp({
		url: '/doctors',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	});

	if ((res as AxiosError).isAxiosError) {
		return res as AxiosError;
	}

	return (res as AxiosResponse).data as DoctorsResponse[];
};
